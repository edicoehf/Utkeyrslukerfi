using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Repositories.Interfaces;
using Utkeyrslukerfi.API.Services.Interfaces;

namespace Utkeyrslukerfi.API.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepo;

        public UserService(IUserRepository userRepository)
        {
            _userRepo = userRepository;
        }

        public UserDTO GetUser(int ID)
        {
            return _userRepo.GetUser(ID);
        }
        public IEnumerable<UserDTO> GetUsers(int role, int pageSize, int pageNumber)
        {
            if (role == 0)
            {
                return _userRepo.GetUsers(pageSize, pageNumber);
            }
            return _userRepo.GetUsersByRole(role, pageSize, pageNumber);

        }
        public UserDTO CreateUser(UserInputModel user)
        {
            return _userRepo.CreateUser(user);
        }
        public void UpdateUser(UserInputModel user, int id)
        {
            _userRepo.UpdateUser(user, id);
        }
    }
}