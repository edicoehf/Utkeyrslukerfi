using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Repositories.Interfaces{
    public interface IUserRepository{
        UserDTO GetUser(string ID);
        IEnumerable<UserDTO> GetUsers();
        UserDTO CreateUser(UserInputModel delivery);
        void UpdateUser(UserInputModel delivery, int ID);
    }
}