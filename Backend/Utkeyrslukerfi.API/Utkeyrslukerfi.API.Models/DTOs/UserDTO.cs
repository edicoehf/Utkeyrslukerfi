namespace Utkeyrslukerfi.API.Models.Dtos
{
    public class UserDTO
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int Role { get; set; }
        public int TokenID { get; set; }
        public bool ChangePassword { get; set; }
    }
}