using Utkeyrslukerfi.API.Models.Dtos;

namespace Utkeyrslukerfi.API.Services.Interfaces
{
    public interface ITokenService
    {
        string GenerateJwtToken(UserDTO user);
    }
}