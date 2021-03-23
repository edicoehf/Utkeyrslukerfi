using Utkeyrslukerfi.API.Repositories.Interfaces;
using Utkeyrslukerfi.API.Services.Interfaces;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.Entities;

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

        public void Logout(int tokenID)
        {
            _tokenRepository.VoidToken(tokenID);
        }

        public int GetUserID(int tokenID)
        {
            _tokenRepository.GetUserID(tokenID);
        }
    }
}