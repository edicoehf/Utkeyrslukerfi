using System;
using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Services.Interfaces
{
    public interface IUserService
    {
        UserDTO GetUser(Guid ID);
        UserDTO GetUserByEmail(string email);
        IEnumerable<UserDTO> GetUsers(int role, int pageSize, int pageNumber);
        IEnumerable<DriverDTO> GetDrivers();
        UserDTO CreateUser(UserInputModel user);
        void UpdateUser(UserInputModel user, Guid ID);
        void UpdatePassword(PasswordInputModel password, Guid ID);
    }
}