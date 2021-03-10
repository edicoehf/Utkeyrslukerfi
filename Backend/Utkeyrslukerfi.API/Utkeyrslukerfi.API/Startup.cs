using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
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

namespace Utkeyrslukerfi.API
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            System.Console.WriteLine();
            services.AddControllers();
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "Utkeyrslukerfi", Version = "v1" });
                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                options.IncludeXmlComments(xmlPath);
            });
            services.AddDbContext<UtkeyrslukerfiDbContext>(options =>
            {
                options.UseMySQL(Configuration["MYSQL:connectionString"],
                      options =>
                      {
                          options.MigrationsAssembly(Assembly.GetExecutingAssembly().FullName);
                      }
                    );
            });

            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                    builder =>
                                    {
                                        builder.WithOrigins("http://localhost:3000");
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

            // Adding Transients
            // maps the Interface to the Implementation
            // and adds the Service to every controller
            services.AddTransient<IDeliveryService, DeliveryService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IPackageService, PackageService>();
            services.AddTransient<IAddressService, AddressService>();
            services.AddTransient<IVehicleService, VehicleService>();

            // Adding Repository Transients
            // maps the Interface to the Implementation
            // and adds the repository to every Service
            services.AddTransient<IDeliveryRepository, DeliveryRepository>();
            services.AddTransient<IAddressRepository, AddressRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IPackageRepository, PackageRepository>();
            services.AddTransient<IVehicleRepository, VehicleRepository>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Utkeyrslukerfi v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
