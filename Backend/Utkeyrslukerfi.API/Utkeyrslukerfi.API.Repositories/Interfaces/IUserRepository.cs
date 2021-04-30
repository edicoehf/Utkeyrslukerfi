using System;
using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Repositories.Interfaces
{
    public interface IUserRepository
    {
        UserDTO GetUser(Guid ID);
        UserDTO GetUserByEmail(string email);
        IEnumerable<UserDTO> GetUsers(int pageSize, int pageNumber);
        IEnumerable<DriverDTO> GetDrivers();
        IEnumerable<UserDTO> GetUsersByRole(int role, int pageSize, int pageNumber);
        UserDTO CreateUser(UserInputModel user);
        void UpdateUser(UserInputModel user, Guid ID);
        void UpdatePassword(PasswordInputModel password, Guid ID);
        User Login(LoginInputModel loginInputModel);
        User DriverLogin(DriverLoginInputModel driverLoginInputModel);
    }
}