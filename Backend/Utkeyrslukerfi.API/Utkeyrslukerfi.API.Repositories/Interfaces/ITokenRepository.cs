using Utkeyrslukerfi.API.Models.Entities;

namespace Utkeyrslukerfi.API.Repositories.Interfaces
{
    public interface ITokenRepository
    {
        JwtToken CreateNewToken(User user);
        bool IsTokenBlacklisted(int tokenID);
        void VoidToken(int tokenID);
        int GetUserID(int tokenID);
    }
}