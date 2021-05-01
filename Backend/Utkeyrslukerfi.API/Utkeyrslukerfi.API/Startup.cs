using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Utkeyrslukerfi.API.Repositories.Context;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using System.Reflection;
using System.IO;
using Utkeyrslukerfi.API.Services.Interfaces;
using Utkeyrslukerfi.API.Services.Implementations;
using Utkeyrslukerfi.API.Repositories.Implementations;
using Utkeyrslukerfi.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Utkeyrslukerfi.API.Middlewares;
using Hangfire;
using Hangfire.MemoryStorage;
using System.Collections.Specialized;
using Utkeyrslukerfi.API.Repositories.IContext;

namespace Utkeyrslukerfi.API
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        private readonly IConfiguration _configuration;


        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            _configuration = configuration;
        }

        public IConfiguration Configuration { get; }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // adding Hangfire
            services.AddHangfire(options =>
              {
                  options.UseMemoryStorage();
              });


            services.AddControllers();
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "Utkeyrslukerfi", Version = "v1" });
                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                options.IncludeXmlComments(xmlPath);
            });



            // Tries to get the connectionString from the azure storage
            var myConnString = _configuration.GetConnectionString("MYSQL:connectionString");
            // if the connectionString is null, it means we're running locally
            // so we get the connection string from secrets
            if (myConnString == null)
            {
                myConnString = Configuration["MYSQL:connectionString"];
            }
            services.AddDbContext<UtkeyrslukerfiDbContext>(options =>
            {
                options.UseMySQL(myConnString,
                      options =>
                      {
                          options.MigrationsAssembly(Assembly.GetExecutingAssembly().FullName);
                      }
                    );
            });
            // Register service and implementation for the db context, need lambda expression to resolve an actual instance through the container
            services.AddScoped<IUtkeyrslukerfiDbContext>(provider => provider.GetService<UtkeyrslukerfiDbContext>()); 
            services.AddAuthentication(config =>
            {
                config.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                config.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtTokenAuthentication(Configuration);
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                    builder =>
                                    {
                                        builder.WithOrigins("http://localhost:3000")
                                                  .AllowAnyHeader()
                                                  .AllowAnyMethod(); ;
                                    });
            });

            // Adding Mapper
            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });
            // adding mapper
            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);

            // adding configuration so it can be accesed from other classes
            services.AddSingleton<IConfiguration>(Configuration);

            // Adding Transients
            // maps the Interface to the Implementation
            // and adds the Service to every controller
            services.AddTransient<IDeliveryService, DeliveryService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IPackageService, PackageService>();
            services.AddTransient<IAddressService, AddressService>();
            services.AddTransient<IVehicleService, VehicleService>();
            services.AddTransient<IJwtTokenService, JwtTokenService>();
            services.AddTransient<IAccountService, AccountService>();
            services.AddTransient<IFetchDataService, FetchDataService>();
            // Since token service constructor takes in strings
            var jwtConfig = Configuration.GetSection("JwtConfig");
            services.AddTransient<ITokenService>((c) =>
                new TokenService(
                    jwtConfig.GetSection("secret").Value,
                    jwtConfig.GetSection("expirationInMinutes").Value,
                    jwtConfig.GetSection("issuer").Value,
                    jwtConfig.GetSection("audience").Value));

            // Adding Repository Transients
            // maps the Interface to the Implementation
            // and adds the repository to every Service
            services.AddTransient<IDeliveryRepository, DeliveryRepository>();
            services.AddTransient<IAddressRepository, AddressRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<ITokenRepository, TokenRepository>();
            services.AddTransient<IPackageRepository, PackageRepository>();
            services.AddTransient<IVehicleRepository, VehicleRepository>();
            services.AddTransient<IFetchDataRepository, FetchDataRepository>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Utkeyrslukerfi v1"));

            app.UseHangfireDashboard();
            app.UseHangfireServer();

            app.UseMiddleware(typeof(ErrorHandlingMiddleware));

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(builder => builder
                      .AllowAnyOrigin()
                      .AllowAnyMethod()
                      .AllowAnyHeader());

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            // starting cron jobs with hangfire
            RecurringJob.AddOrUpdate<IFetchDataService>(x => x.GetDeliveries(), Cron.Daily);
        }
    }
}
