using System.ComponentModel.DataAnnotations;

namespace Utkeyrslukerfi.API.Models {
    public class ValidateUserPassword:ValidationAttribute {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext) {
            var model = (Models.InputModels.UserInputModel)validationContext.ObjectInstance;
            var password = value;
            var role = model.Role;  

            if (role != 3 && password == null) {
                return new ValidationResult("User must have a password.");                
            }
            else {
                return ValidationResult.Success;
            }
        }
    }
}