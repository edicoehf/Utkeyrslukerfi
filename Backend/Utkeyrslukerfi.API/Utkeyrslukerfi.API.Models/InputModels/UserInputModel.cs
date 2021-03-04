using System.ComponentModel.DataAnnotations;

namespace Utkeyrslukerfi.API.Models.InputModels{
    public class UserInputModel{
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Has to be a valid Email")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Role is required")] // Role 1: admin, 2: office, 3: driver
        public int Role { get; set; }
        // TODO custom data anotations for password
        // which makes it depend on the Role chosen
        // [Required(ErrorMessage = "Password Field is required")]
        [ValidateUserPassword]
        public string Password { get; set; }

    }
}