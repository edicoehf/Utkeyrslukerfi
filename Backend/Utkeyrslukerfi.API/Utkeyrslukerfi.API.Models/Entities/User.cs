using System.Collections.Generic;

namespace Utkeyrslukerfi.API.Models.Entities
{
    public class User
    {
        public int ID { get; set; }
        public string Name { get; set; }
        // TODO change to hashed and stuff
        public string Password { get; set; }
        public string Email { get; set; }
        public int Role { get; set; }


        // Navigation Properties
        public List<Delivery> Deliveries { get; set; }
    }
}