using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Services.Interfaces{
    public interface IUserService{
        UserDTO GetUser(string ID);
        IEnumerable<UserDTO> GetUsers();
        UserDTO CreateUser(UserInputModel delivery);
        void UpdateUser(UserInputModel delivery, int ID);
    }
}