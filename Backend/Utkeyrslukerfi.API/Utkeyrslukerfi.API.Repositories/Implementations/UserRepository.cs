using System.Collections.Generic;
using AutoMapper;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Repositories.Context;
using Utkeyrslukerfi.API.Repositories.Interfaces;

namespace Utkeyrslukerfi.API.Repositories.Implementations{
    public class UserRepository: IUserRepository{
        private readonly UtkeyrslukerfiDbContext _dbContext;
        private readonly IMapper _mapper;

        public UserRepository(IMapper mapper, UtkeyrslukerfiDbContext dbContext){
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public UserDTO GetUser(int ID){
          return null;
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