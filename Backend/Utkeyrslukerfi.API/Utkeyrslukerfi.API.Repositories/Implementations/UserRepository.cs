using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Repositories.Implementations{
    public interface UserRepository{
        UserDTO GetUser(string ID){
          return null;
        }
        IEnumerable<UserDTO> GetUsers(){
          return null;
        }
        UserDTO CreateUser(UserInputModel delivery){
          return null;
        }
        void UpdateUser(UserInputModel delivery, int ID){
          
        }
    }
}