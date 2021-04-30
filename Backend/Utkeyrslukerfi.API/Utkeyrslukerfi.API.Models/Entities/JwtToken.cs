using System;

namespace Utkeyrslukerfi.API.Models.Entities
{
    public class JwtToken
    {
        public int ID { get; set; }
        public bool Blacklisted { get; set; }
        // Navigation Property
        public Guid UserID { get; set; }
        public User User { get; set; }
    }
}