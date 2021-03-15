namespace Utkeyrslukerfi.API.Services.Interfaces
{
    public interface IJwtTokenService
    {
        bool IsTokenBlacklisted(int tokenID);
    }
}