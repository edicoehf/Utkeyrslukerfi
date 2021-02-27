using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Services.Interfaces;

namespace Utkeyrslukerfi.API.Services.Implementations{
    public class UserService : IUserService {
        public UserDTO GetUser(int ID){
          return  null;
        }
        public IEnumerable<UserDTO> GetUsers(){
          return null;
        }
        public UserDTO CreateUser(UserInputModel delivery){
          return null;
        }
        public void UpdateUser(UserInputModel delivery, int ID){

        }
    }
}