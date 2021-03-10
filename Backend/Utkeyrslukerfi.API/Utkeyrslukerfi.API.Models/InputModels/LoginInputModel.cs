using System.ComponentModel.DataAnnotations;

namespace Utkeyrslukerfi.API.Models.InputModels
{
    public class LoginInputModel
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Has to be a valid Email")]
        public string Email { get; set; }
        [ValidateUserPassword]
        public string Password { get; set; }

    }
}