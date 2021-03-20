using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.Entities;

namespace Utkeyrslukerfi.API.Services.Interfaces
{
    public interface ITokenService
    {
        string GenerateJwtToken(User user);
    }
}