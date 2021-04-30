using Utkeyrslukerfi.API.Repositories.Interfaces;
using Utkeyrslukerfi.API.Services.Interfaces;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.Entities;
using System;

namespace Utkeyrslukerfi.API.Services.Implementations
{
    public class AccountService : IAccountService
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenRepository _tokenRepository;
        public AccountService(IUserRepository userRepository, ITokenRepository tokenRepository)
        {
            _userRepository = userRepository;
            _tokenRepository = tokenRepository;
        }

        public User Login(LoginInputModel loginInputModel)
        {
            return _userRepository.Login(loginInputModel);
        }
        public User DriverLogin(DriverLoginInputModel driverLoginInputModel)
        {
            return _userRepository.DriverLogin(driverLoginInputModel);
        }

        public void Logout(int tokenID)
        {
            _tokenRepository.VoidToken(tokenID);
        }

        public Guid GetUserID(int tokenID)
        {
            return _tokenRepository.GetUserID(tokenID);
        }
    }
}