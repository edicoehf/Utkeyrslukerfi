using Utkeyrslukerfi.API.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;
using Utkeyrslukerfi.API.Models.Dtos;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using System;
using Utkeyrslukerfi.API.Models.Entities;

namespace Utkeyrslukerfi.API.Services.Implementations
{
    public class TokenService : ITokenService
    {
        private readonly string _secret;
        private readonly string _expDate;
        private readonly string _issuer;
        private readonly string _audience;
        public TokenService(string secret, string expDate, string issuer, string audience)
        {
            _secret = secret;
            _expDate = expDate;
            _issuer = issuer;
            _audience = audience;
        }
        public string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = GetSecurityTokenDescriptor(user);
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private SecurityTokenDescriptor GetSecurityTokenDescriptor(User user)
        {
            var key = Encoding.ASCII.GetBytes(_secret);
            return new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("email", user.Email),
                    new Claim("name", user.Name),
                    new Claim("tokenID", user.TokenID.ToString())
                }),
                Audience = _audience,
                Issuer = _issuer,
                Expires = DateTime.UtcNow.AddMinutes(double.Parse(_expDate)),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
        }
    }
}
