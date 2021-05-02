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

        [Fact]
        public void ShouldBeValid_LoginUser()
        {
            // Arrange
            var loginInfo = new LoginInputModel() { Email = "maria@gmail.com", Password = "password" };
            var newUser = new User() { Email = "maria@gmail.com", Password = HashingHelper.HashPassword("password") };
            _dbContext.Users.Add(newUser);
            _dbContext.SaveChanges();
            var user = _userRepo.Login(loginInfo);
            Assert.True(newUser.Equals(user));
            _dbContext.Remove(newUser);
            _dbContext.SaveChanges();
        }

        [Fact]
        public void ShouldBeInvalid_LoginUser()
        {
            // Arrange
            var loginInfo = new LoginInputModel() { Email = "maria@gmail.com", Password = "password" };
            Assert.Throws<InvalidLoginException>(() => _userRepo.Login(loginInfo));
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
