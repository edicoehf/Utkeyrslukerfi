using System;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Services.Interfaces
{
    public interface IAccountService
    {
        User Login(LoginInputModel loginInputModel);
        User DriverLogin(DriverLoginInputModel driverLoginInputModel);
        void Logout(int tokenID);
        Guid GetUserID(int tokenID);
    }
}