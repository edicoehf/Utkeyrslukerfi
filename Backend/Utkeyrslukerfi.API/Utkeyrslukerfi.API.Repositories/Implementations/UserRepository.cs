using System.Linq;
using System.Collections.Generic;
using AutoMapper;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Repositories.Context;
using Utkeyrslukerfi.API.Repositories.Interfaces;
using Utkeyrslukerfi.API.Models.Exceptions;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Models.Envelope;
using Utkeyrslukerfi.API.Repositories.Helpers;
using System;
using Utkeyrslukerfi.API.Repositories.IContext;

namespace Utkeyrslukerfi.API.Repositories.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly IUtkeyrslukerfiDbContext _dbContext;
        private readonly ITokenRepository _tokenRepository;
        private readonly IMapper _mapper;
        public UserRepository(IMapper mapper, IUtkeyrslukerfiDbContext dbContext, ITokenRepository tokenRepository)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _tokenRepository = tokenRepository;
        }
        public UserDTO GetUser(Guid ID)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.ID == ID);
            if (user == null)
            {
                throw new NotFoundException($"No user with id: {ID}");
            }
            return _mapper.Map<UserDTO>(user);
        }
        public UserDTO GetUserByEmail(string email)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Email == email);
            if (user == null)
            {
                throw new NotFoundException($"No user with email: {email}");
            }
            return _mapper.Map<UserDTO>(user);
        }
        public IEnumerable<UserDTO> GetUsers(int pageSize, int pageNumber)
        {
            var users = _dbContext.Users;
            Envelope<User> envelope = new Envelope<User>(pageNumber, pageSize, users);
            return _mapper.Map<IEnumerable<UserDTO>>(envelope.Items);
        }
        public IEnumerable<DriverDTO> GetDrivers()
        {
            var users = _dbContext.Users.Where(u => u.Role == 3);
            return _mapper.Map<IEnumerable<DriverDTO>>(users);
        }
        public IEnumerable<UserDTO> GetUsersByRole(int role, int pageSize, int pageNumber)
        {
            var users = _dbContext.Users.Where(u => u.Role == role);
            Envelope<User> envelope = new Envelope<User>(pageNumber, pageSize, users);
            return _mapper.Map<IEnumerable<UserDTO>>(envelope.Items);
        }
        public UserDTO CreateUser(UserInputModel user)
        {
            var tempUser = _dbContext.Users.FirstOrDefault(u => u.Email == user.Email);
            if (tempUser != null) { throw new EmailAlreadyExistsException($"User with email: {user.Email} already exists!"); }
            var tempPass = user.Password == null ? null : HashingHelper.HashPassword(user.Password);
            // create new entity with the hashed password
            var entity = new User
            {
                Name = user.Name,
                Password = tempPass,
                Role = user.Role,
                Email = user.Email,
                ChangePassword = user.ChangePassword
            };

            _dbContext.Users.Add(entity);
            _dbContext.SaveChanges();

            return _mapper.Map<UserDTO>(entity);
        }
        public void UpdateUser(UserInputModel user, Guid id)
        {
            var tempUser = _dbContext.Users.FirstOrDefault(u => u.ID == id);
            if (tempUser == null) { throw new NotFoundException($"User with id: {id} is not found!"); }
            var tempPass = user.Password == null ? null : HashingHelper.HashPassword(user.Password);

            // Update old user with the new user
            tempUser.Name = user.Name;
            tempUser.Password = tempPass;
            tempUser.Role = user.Role;
            tempUser.Email = user.Email;
            tempUser.ChangePassword = user.ChangePassword;

            // save changes
            _dbContext.SaveChanges();
        }
        public void UpdatePassword(PasswordInputModel password, Guid id)
        {
            var tempPass = HashingHelper.HashPassword(password.Password);
            var tempUser = _dbContext.Users.FirstOrDefault(u => u.ID == id);
            if (tempUser == null) { throw new NotFoundException($"User with id: {id} is not found!"); }

            // Update old user with the new user
            tempUser.Password = tempPass;
            tempUser.ChangePassword = password.ChangePassword;

            // save changes
            _dbContext.SaveChanges();
        }
        public User Login(LoginInputModel loginInputModel)
        {
            var user = _dbContext.Users.FirstOrDefault(u =>
                u.Email == loginInputModel.Email &&
                u.Password == HashingHelper.HashPassword(loginInputModel.Password) &&
                u.Role != 3 &&
                u.Role != 4);
            if (user == null) { throw new InvalidLoginException("Either Email or Password is incorrect!"); }

            var token = _tokenRepository.CreateNewToken(user);
            user.TokenID = token.ID;
            _dbContext.SaveChanges();
            return user;
        }
        public User DriverLogin(DriverLoginInputModel driverLoginInputModel)
        {
            var user = _dbContext.Users.FirstOrDefault(u =>
                u.Name == driverLoginInputModel.Name &&
                u.Role == 3);
            if (user == null) { throw new InvalidLoginException("Name is incorrect!"); }

            var token = _tokenRepository.CreateNewToken(user);
            user.TokenID = token.ID;
            _dbContext.SaveChanges();
            return user;
        }
    }
}