using System;
using System.Linq;
using Utkeyrslukerfi.API.Repositories.Interfaces;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Repositories.Context;

namespace Utkeyrslukerfi.API.Repositories.Implementations
{
    public class TokenRepository : ITokenRepository
    {
        private readonly UtkeyrslukerfiDbContext _dbContext;
        public TokenRepository(UtkeyrslukerfiDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public JwtToken CreateNewToken()
        {
            var token = new JwtToken();
            _dbContext.JwtTokens.Add(token);
            _dbContext.SaveChanges();
            return token;
        }

        public bool IsTokenBlacklisted(int tokenID)
        {
            var token = _dbContext.JwtTokens.FirstOrDefault(t => t.ID == tokenID);
            System.Console.WriteLine(tokenID);
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
    }
}