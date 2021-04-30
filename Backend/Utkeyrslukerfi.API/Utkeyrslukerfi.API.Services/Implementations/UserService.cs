using System;
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

        public UserDTO GetUser(Guid ID)
        {
            return _userRepo.GetUser(ID);
        }
        public UserDTO GetUserByEmail(string email)
        {
            return _userRepo.GetUserByEmail(email);
        }
        public IEnumerable<UserDTO> GetUsers(int role, int pageSize, int pageNumber)
        {
            if (role == 0)
            {
                return _userRepo.GetUsers(pageSize, pageNumber);
            }
            return _userRepo.GetUsersByRole(role, pageSize, pageNumber);
        }
        public IEnumerable<DriverDTO> GetDrivers()
        {
            return _userRepo.GetDrivers();

        }
        public UserDTO CreateUser(UserInputModel user)
        {
            return _userRepo.CreateUser(user);
        }
        public void UpdateUser(UserInputModel user, Guid ID)
        {
            _userRepo.UpdateUser(user, ID);
        }
        public void UpdatePassword(PasswordInputModel password, Guid ID)
        {
            _userRepo.UpdatePassword(password, ID);
        }
    }
}