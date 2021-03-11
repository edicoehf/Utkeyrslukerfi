using Utkeyrslukerfi.API.Repositories.Interfaces;
using Utkeyrslukerfi.API.Services.Interfaces;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Models.Dtos;

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

        public UserDTO Login(LoginInputModel loginInputModel)
        {
            // TODO: implement
            return null;
        }

        public void Logout(int tokenId)
        {
            // TODO: implement
        }
    }
}