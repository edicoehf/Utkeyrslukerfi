using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Repositories.Context;
using Utkeyrslukerfi.API.Repositories.Interfaces;
using Utkeyrslukerfi.API.Models.Exceptions;
using Utkeyrslukerfi.API.Models.Entities;

namespace Utkeyrslukerfi.API.Repositories.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly UtkeyrslukerfiDbContext _dbContext;
        private readonly IMapper _mapper;

        public UserRepository(IMapper mapper, UtkeyrslukerfiDbContext dbContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public UserDTO GetUser(int ID)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.ID == ID);
            if (user == null)
            {
                throw new NotFoundException($"No user with id: {ID}");
            }
            return _mapper.Map<UserDTO>(user);
        }
        public IEnumerable<UserDTO> GetUsers(int role){
            if (role != 0) {
                var usersRole = _dbContext.Users.Where(u => u.Role == role);
                return _mapper.Map<IEnumerable<UserDTO>>(usersRole);
            }
            var users = _dbContext.Users;
            return _mapper.Map<IEnumerable<UserDTO>>(users);
        }
        public UserDTO CreateUser(UserInputModel user)
        {
            var entity = _mapper.Map<User>(user);
            _dbContext.Users.Add(entity);
            _dbContext.SaveChanges();
            
            return _mapper.Map<UserDTO>(entity);
        }
        public void UpdateUser(UserInputModel user, int id)
        {
            var tempUser = _dbContext.Users.FirstOrDefault(u => u.ID == id);
            if (tempUser == null) { throw new NotFoundException("User not found!"); }
            
            // Update old user with the new user
            tempUser.Name = user.Name;
            tempUser.Password = user.Password;
            tempUser.Role = user.Role;
            tempUser.Email = user.Email;

            // save changes
            _dbContext.SaveChanges();
        }
    }
}