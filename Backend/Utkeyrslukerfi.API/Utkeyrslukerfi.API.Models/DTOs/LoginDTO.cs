using System.Collections.Generic;

namespace Utkeyrslukerfi.API.Models.Dtos
{
    public class LoginDto
    {
        public string Token { get; set; }
        public bool ChangePassword { get; set; }
        public int Role { get; set; }
    }
}