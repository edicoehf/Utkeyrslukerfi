using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Repositories.Context;
using Utkeyrslukerfi.API.Repositories.Interfaces;
using Utkeyrslukerfi.API.Models.Exceptions;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Models.Envelope;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace Utkeyrslukerfi.API.Repositories.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly UtkeyrslukerfiDbContext _dbContext;
        private readonly IMapper _mapper;
        private string _salt = "wmwj8iols3euy03c2zol285yzgy3sdwj";

        public UserRepository(IMapper mapper, UtkeyrslukerfiDbContext dbContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        private byte[] CreateSalt() => Convert.FromBase64String(Convert.ToBase64String(Encoding.UTF8.GetBytes(_salt)));

        private string HashPassword(string password)
        {
            return Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: password,
            salt: CreateSalt(),
            prf: KeyDerivationPrf.HMACSHA1,
            iterationCount: 10000,
            numBytesRequested: 256 / 8));
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
        public IEnumerable<UserDTO> GetUsers(int pageSize, int pageNumber)
        {
            var users = _dbContext.Users;
            Envelope<User> envelope = new Envelope<User>(pageNumber, pageSize, users);
            return _mapper.Map<IEnumerable<UserDTO>>(envelope.Items);
        }
        public IEnumerable<UserDTO> GetUsersByRole(int role, int pageSize, int pageNumber)
        {
            var users = _dbContext.Users.Where(u => u.Role == role);
            Envelope<User> envelope = new Envelope<User>(pageNumber, pageSize, users);
            return _mapper.Map<IEnumerable<UserDTO>>(envelope.Items);
        }
        public UserDTO CreateUser(UserInputModel user)
        {
            var tempPass = HashPassword(user.Password);
            var tempUser = _dbContext.Users.FirstOrDefault(u => u.Email == user.Email);
            if (user != null) { throw new InvalidLoginException($"User with email: {user.Email} already exists!"); }

            // create new entity with the hashed password
            var entity = new User
            {
                Name = user.Name,
                Password = tempPass,
                Role = user.Role,
                Email = user.Email
            };

            _dbContext.Users.Add(entity);
            _dbContext.SaveChanges();

            return _mapper.Map<UserDTO>(entity);
        }
        public void UpdateUser(UserInputModel user, int id)
        {
            var tempPass = HashPassword(user.Password);
            var tempUser = _dbContext.Users.FirstOrDefault(u => u.ID == id);
            if (tempUser == null) { throw new NotFoundException($"User with id: {id} is not found!"); }

            // Update old user with the new user
            tempUser.Name = user.Name;
            tempUser.Password = tempPass;
            tempUser.Role = user.Role;
            tempUser.Email = user.Email;

            // save changes
            _dbContext.SaveChanges();
        }
    }
}