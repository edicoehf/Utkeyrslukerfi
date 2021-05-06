using System;
using Xunit;
using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Repositories.Implementations;
using Utkeyrslukerfi.API.Models.Exceptions;
using AutoMapper;
using Utkeyrslukerfi.API;
using Utkeyrslukerfi.API.Repositories.Context;
using Utkeyrslukerfi.API.Repositories.IContext;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Utkeyrslukerfi.API.Repositories.Helpers;
using Utkeyrslukerfi.API.Models.Dtos;

namespace Tests
{
    public class UnitTestUserRepository
    {
        private readonly UserRepository _userRepo;
        private readonly UtkeyrslukerfiDbContext _dbContext;
        private readonly IMapper _mapper;

        public UnitTestUserRepository()
        {
            _dbContext = GetContext();
            _mapper = GetMapper();
            _userRepo = GetUserRepository(_dbContext, _mapper);
        }

        private static UtkeyrslukerfiDbContext GetContext()
        {
            var options = new DbContextOptionsBuilder<UtkeyrslukerfiDbContext>()
                                  .UseInMemoryDatabase("Utkeyrslukerfi")
                                  .Options;
            var dbContext = new UtkeyrslukerfiDbContext(options);
            return dbContext;
        }

        private static IMapper GetMapper()
        {
            // Generating Mapper annd dbcontext, as it's needed in the Repository class
            var mapperConfig = new MapperConfiguration(mc => { mc.AddProfile(new MappingProfile()); });
            var mapper = mapperConfig.CreateMapper();
            return mapper;
        }

        private static UserRepository GetUserRepository(UtkeyrslukerfiDbContext dbContext, IMapper mapper)
        {
            var tokenRepo = new TokenRepository(dbContext);
            var userRepo = new UserRepository(mapper, dbContext, tokenRepo);
            return userRepo;
        }

        [Theory]
        [ClassData(typeof(LoginUserValidData))]
        public void ShouldBeValid_LoginUser(User newUser, LoginInputModel login)
        {
            // Only users with roles 1 and 2 (admin and office worker) should be able to log in
            // Set up data
            _dbContext.Users.Add(newUser);
            _dbContext.SaveChanges();

            // Run function
            var user = _userRepo.Login(login);

            // Check results
            Assert.True(newUser.Equals(user));

            // Cleanup
            _dbContext.Remove(newUser);
            _dbContext.SaveChanges();
        }

        [Fact]
        public void ShouldBeInvalid_NoUser_LoginUser()
        {
            // Arrange
            var loginInfo = new LoginInputModel() { Email = "maria@gmail.com", Password = "password" };
            Assert.Throws<InvalidLoginException>(() => _userRepo.Login(loginInfo));
        }

        [Theory]
        [ClassData(typeof(LoginUserInvalidData))]
        public void ShouldBeInvalid_WrongRole_LoginUser(User newUser, LoginInputModel login)
        {
            // Users with roles 3 and 4 (drivers and disabled) should not be able to log in
            // Set up data
            _dbContext.Users.Add(newUser);
            _dbContext.SaveChanges();

            // Run function and check results
            Assert.Throws<InvalidLoginException>(() => _userRepo.Login(login));

            // Cleanup
            _dbContext.Remove(newUser);
            _dbContext.SaveChanges();
        }

        [Theory]
        [ClassData(typeof(LoginDriverValidData))]
        public void ShouldBeValid_LoginDriver(User newUser, DriverLoginInputModel login)
        {
            // Only users with role 3 (drivers) should not be able to log in with no password
            // Set up data
            _dbContext.Users.Add(newUser);
            _dbContext.SaveChanges();

            // Run function
            var user = _userRepo.DriverLogin(login);

            // Check results
            Assert.True(newUser.Equals(user));

            // Cleanup
            _dbContext.Remove(newUser);
            _dbContext.SaveChanges();
        }

        [Fact]
        public void ShouldBeInvalid_NoUser_LoginDriver()
        {
            // Arrange
            var loginInfo = new DriverLoginInputModel() { Name = "Maria Jónsdóttir" };
            Assert.Throws<InvalidLoginException>(() => _userRepo.DriverLogin(loginInfo));
        }

        [Theory]
        [ClassData(typeof(LoginDriverInvalidData))]
        public void ShouldBeInvalid_WrongRole_LoginDriver(User newUser, DriverLoginInputModel login)
        {
            // Users with roles 3 and 4 (drivers and disabled) should not be able to log in
            // Set up data
            _dbContext.Users.Add(newUser);
            _dbContext.SaveChanges();

            // Run function and check results
            Assert.Throws<InvalidLoginException>(() => _userRepo.DriverLogin(login));

            // Cleanup
            _dbContext.Remove(newUser);
            _dbContext.SaveChanges();
        }

        [Theory]
        [ClassData(typeof(CreateUserValidData))]
        public void ShouldBeValid_CreateUser(UserInputModel data)
        {
            var user = _userRepo.CreateUser(data);
            var dataMapped = _mapper.Map<UserDTO>(data);
            Assert.True(user.Email == dataMapped.Email);
            Assert.True(user.ChangePassword == dataMapped.ChangePassword);
            Assert.True(user.Name == dataMapped.Name);
            Assert.True(user.Role == dataMapped.Role);
        }
        [Fact]
        public void ShouldBeInvalid_CreateUser()
        {
            var user = new UserInputModel() { Role = 2, Name = "Séra Admin", Email = "sera123@admin.is" };
            _userRepo.CreateUser(user);
            Assert.Throws<EmailAlreadyExistsException>(() => _userRepo.CreateUser(user));
        }

        public class LoginUserValidData : TheoryData<User, LoginInputModel>
        {
            public LoginUserValidData()
            {
                Add(new User() { Role = 1, Email = "sera@admin.is", Password = HashingHelper.HashPassword("wow_flott_pw") },
                    new LoginInputModel() { Email = "sera@admin.is", Password = "wow_flott_pw" });
                Add(new User() { Role = 2, Email = "sera1@admin.is", Password = HashingHelper.HashPassword("wow_flott_pw") },
                    new LoginInputModel() { Email = "sera1@admin.is", Password = "wow_flott_pw" });
            }
        }
        public class LoginUserInvalidData : TheoryData<User, LoginInputModel>
        {
            public LoginUserInvalidData()
            {
                Add(new User() { Role = 3, Email = "sera2@admin.is" },
                    new LoginInputModel() { Email = "sera2@admin.is", Password = "wow_flott_pw" });
                Add(new User() { Role = 4, Email = "sera3@admin.is" },
                    new LoginInputModel() { Email = "sera3@admin.is", Password = "wow_flott_pw" });
            }
        }
        public class LoginDriverValidData : TheoryData<User, DriverLoginInputModel>
        {
            public LoginDriverValidData()
            {
                Add(new User() { Role = 3, Name = "Séra Admin 3" },
                    new DriverLoginInputModel() { Name = "Séra Admin 3" });
            }
        }
        public class LoginDriverInvalidData : TheoryData<User, DriverLoginInputModel>
        {
            public LoginDriverInvalidData()
            {
                Add(new User() { Role = 1, Name = "Séra Admin 1", Password = HashingHelper.HashPassword("wow_flott_pw") },
                    new DriverLoginInputModel() { Name = "Séra Admin 1" });
                Add(new User() { Role = 2, Name = "Séra Admin 2", Password = HashingHelper.HashPassword("wow_flott_pw") },
                    new DriverLoginInputModel() { Name = "Séra Admin 2" });
                Add(new User() { Role = 4, Name = "Séra Admin 4" },
                    new DriverLoginInputModel() { Name = "Séra Admin 4" });
            }
        }
        public class CreateUserValidData : TheoryData<UserInputModel>
        {
            public CreateUserValidData()
            {
                Add(new UserInputModel() { Role = 1, Name = "Séra Admin", Email = "sera@admin.is", ChangePassword = false, Password = "wow_flott_pw" });
                Add(new UserInputModel() { Role = 2, Name = "Séra Admin", Email = "sera1@admin.is", ChangePassword = false, Password = "wow_flott_pw" });
                Add(new UserInputModel() { Role = 3, Name = "Séra Admin", Email = "sera2@admin.is" });
            }
        }
    }
}
