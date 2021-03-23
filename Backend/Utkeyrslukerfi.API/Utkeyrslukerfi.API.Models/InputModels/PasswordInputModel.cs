using System.ComponentModel.DataAnnotations;

namespace Utkeyrslukerfi.API.Models.InputModels
{
    public class PasswordInputModel
    {
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
        [Required(ErrorMessage = "ChangePassword is required")]
        public bool ChangePassword { get; set; }

    }
}