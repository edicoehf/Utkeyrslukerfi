using System.ComponentModel.DataAnnotations;
namespace Utkeyrslukerfi.API.Models.InputModels{
    public class UserInputModel{
        [Required(ErrorMessage = "Id is required")]
        public string ID { get; set; }
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Has to be a valid Email")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Role is required")]
        public int Role { get; set; }
        // TODO custom data anotations for password
        // which makes it depend on the Role chosen
        [Required(ErrorMessage = "Password Field is required")]
        public string Password { get; set; }

    }
}