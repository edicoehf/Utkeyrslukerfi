using System.Collections.Generic;

namespace Utkeyrslukerfi.API.Models.Entities
{
    public class User
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public int Role { get; set; }
        public bool ChangePassword { get; set; }
        public int TokenID { get; set; }

        // Navigation Properties
        public List<Delivery> Deliveries { get; set; }
    }
}