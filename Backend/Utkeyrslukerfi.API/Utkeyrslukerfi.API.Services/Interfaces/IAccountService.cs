using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Services.Interfaces
{
    public interface IAccountService
    {
        UserDTO Login(LoginInputModel loginInputModel);
        void Logout(int tokenId);
    }
}