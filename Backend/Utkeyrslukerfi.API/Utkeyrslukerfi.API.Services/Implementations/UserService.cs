using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Services.Implementations{
    public interface UserService{
        UserDTO GetUser(string ID){
          return  null;
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