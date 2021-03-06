using System;
using System.Linq;
using Utkeyrslukerfi.API.Repositories.Interfaces;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Repositories.Context;
using Utkeyrslukerfi.API.Models.Exceptions;
using Utkeyrslukerfi.API.Repositories.IContext;

namespace Utkeyrslukerfi.API.Repositories.Implementations
{
    public class TokenRepository : ITokenRepository
    {
        private readonly IUtkeyrslukerfiDbContext _dbContext;
        public TokenRepository(IUtkeyrslukerfiDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public JwtToken CreateNewToken(User user)
        {
            var token = new JwtToken
            {
                UserID = user.ID,
                User = user,
                Blacklisted = false
            };

            _dbContext.JwtTokens.Add(token);
            _dbContext.SaveChanges();

            return token;
        }
        public bool IsTokenBlacklisted(int tokenID)
        {
            var token = _dbContext.JwtTokens.FirstOrDefault(t => t.ID == tokenID);
            if (token == null) { return true; }
            return token.Blacklisted;
        }
        public void VoidToken(int tokenID)
        {
            var token = _dbContext.JwtTokens.FirstOrDefault(t => t.ID == tokenID);
            if (token == null) { return; }
            token.Blacklisted = true;
            _dbContext.SaveChanges();
        }
        public Guid GetUserID(int tokenID)
        {
            var token = _dbContext.JwtTokens.FirstOrDefault(t => t.ID == tokenID);
            if (token == null) { throw new NotFoundException($"Not found."); }
            return token.UserID;
        }
    }
}