namespace Utkeyrslukerfi.API.Models.Entities
{
    public class JwtToken
    {
        public int ID { get; set; }
        public bool Blacklisted { get; set; }

        // Navigation Properties
        public User User { get; set; }
    }
}