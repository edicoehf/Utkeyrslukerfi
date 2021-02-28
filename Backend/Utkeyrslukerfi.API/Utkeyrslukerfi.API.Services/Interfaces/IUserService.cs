using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Services.Interfaces{
    public interface IUserService{
        UserDTO GetUser(int ID);
        IEnumerable<UserDTO> GetUsers();
        UserDTO CreateUser(UserInputModel delivery);
        void UpdateUser(UserInputModel delivery, int id);
    }
}