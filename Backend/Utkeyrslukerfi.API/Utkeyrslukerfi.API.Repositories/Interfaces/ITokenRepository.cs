using Utkeyrslukerfi.API.Models.Entities;

namespace Utkeyrslukerfi.API.Repositories.Interfaces
{
    public interface ITokenRepository
    {
        JwtToken CreateNewToken();
        bool IsTokenBlacklisted(int tokenId);
        void VoidToken(int tokenId);
    }
}