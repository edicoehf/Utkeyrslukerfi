using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Repositories.Interfaces{
    public interface IUserRepository{
        UserDTO GetUser(int ID);
        IEnumerable<UserDTO> GetUsers(int role);
        UserDTO CreateUser(UserInputModel user);
        void UpdateUser(UserInputModel user, int ID);
    }
}