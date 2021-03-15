using Utkeyrslukerfi.API.Repositories.Interfaces;
using Utkeyrslukerfi.API.Services.Interfaces;

namespace Utkeyrslukerfi.API.Services.Implementations
{
    public class JwtTokenService : IJwtTokenService
    {
        private readonly ITokenRepository _tokenRepository;
        public JwtTokenService(ITokenRepository tokenRepository)
        {
            _tokenRepository = tokenRepository;
        }
        public bool IsTokenBlacklisted(int tokenID)
        {
            return _tokenRepository.IsTokenBlacklisted(tokenID);
        }
    }
}