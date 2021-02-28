using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Repositories.Context;
using Utkeyrslukerfi.API.Repositories.Interfaces;

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
                // TODO implement Excepition handling
                System.Console.WriteLine($"No user with id: {ID}");
                return null;
            }
            return _mapper.Map<UserDTO>(user);
        }
        public IEnumerable<UserDTO> GetUsers()
        {
            return null;
        }
        public UserDTO CreateUser(UserInputModel delivery)
        {
            return null;
        }
        public void UpdateUser(UserInputModel user, int id)
        {
            var tempUser = _dbContext.Users.FirstOrDefault(u => u.ID == id);
            if (tempUser == null) { throw new System.Exception("User not found."); }

            // var deliveries = _dbContext.Deliveries.FirstOrDefault(d => d.Driver.ID == id);
            
            tempUser.Name = user.Name;
            tempUser.Password = user.Password;
            tempUser.Role = user.Role;
            tempUser.Email = user.Email;
            // tempUser.Deliveries = deliveries;

            _dbContext.SaveChanges();
        }
    }
}