using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Services.Interfaces
{
    public interface IAccountService
    {
        User Login(LoginInputModel loginInputModel);
        void Logout(int tokenID);
    }
}