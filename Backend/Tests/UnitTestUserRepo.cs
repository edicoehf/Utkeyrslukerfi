using System;
using Xunit;
using System.Collections;
using System.Collections.Generic;
using Utkeyrslukerfi.API.Models;
using System.ComponentModel.DataAnnotations;

using Moq;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Services;
using Utkeyrslukerfi.API.Services.Implementations;
using Utkeyrslukerfi.API.Repositories.Implementations;
using Utkeyrslukerfi.API.Repositories.Interfaces;
using Utkeyrslukerfi.API.Repositories.Context;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Models.InputModels;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Tests
{
    public class UnitTestUserRepository
    {
        private readonly UserRepository _userRepo;
        private readonly IMapper _mapper;
        private readonly Mock<IUtkeyrslukerfiDbContext> _mockContext = new Mock<IUtkeyrslukerfiDbContext>();
        private readonly TokenRepository _tokenRepository;

        public UnitTestUserRepository()
        {
            _tokenRepository = new TokenRepository(_mockContext.Object);
            _userRepo = new UserRepository(_mapper, _mockContext.Object, _tokenRepository);
        }

        [Fact]
        public void ShouldBeInvalid_TestGetUser()
        {
            // Arrange
            var loginInfo = new LoginInputModel() { Email = "maria@gmail.com", Password = "password" };

            // Act
            var user = _userRepo.Login(loginInfo);

            // Assert
            Assert.Equal(loginInfo.Email, user.Email);
            
        }
    }
}
