using System.ComponentModel.DataAnnotations;

namespace Utkeyrslukerfi.API.Models
{
    public class ValidateUserPassword : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var model = (Models.InputModels.UserInputModel)validationContext.ObjectInstance;
            string password = value as string;
            var role = model.Role;

            if (role != 3 && string.IsNullOrEmpty(password))
            {
                return new ValidationResult("User must have a password.");
            }
            return ValidationResult.Success;
        }
    }
}