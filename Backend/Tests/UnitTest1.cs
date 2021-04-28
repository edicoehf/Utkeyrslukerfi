using System;
using Xunit;
using System.Collections;
using System.Collections.Generic;
using Utkeyrslukerfi.API.Models;
using Utkeyrslukerfi.API.Models.InputModels;
using System.ComponentModel.DataAnnotations;

namespace Tests
{
    public class UserDataValid : TheoryData<UserInputModel>
    {
        public UserDataValid()
        {
            Add(new UserInputModel() { Name = "John", Email = "john@gmail.com", Role = 1, ChangePassword = true, Password = "thisIsAPassword" });
            Add(new UserInputModel() { Name = "Jane", Email = "jane@gmail.com", Role = 3, ChangePassword = true, Password = "" });
        }
    }

    public class UserDataInvalid : TheoryData<UserInputModel>
    {
        public UserDataInvalid()
        {
            Add(new UserInputModel() { Name = "John", Email = "john@gmail.com", Role = 1, ChangePassword = true, Password = "" });
            Add(new UserInputModel() { Name = "Jane", Email = "jane@gmail.com", Role = 2, ChangePassword = true, Password = "" });
        }
    }

    public class UnitTestValidateUserPassword : ValidationAttribute
    {
        [Theory]
        [ClassData(typeof(UserDataValid))]
        public void ShouldBeValidWhenHasPassword_OrIsDriver_ValidateUserPasswordAttribute(UserInputModel model)
        {
            // Set up data
            ValidationContext context = new ValidationContext(model);
            var validationResults = new List<ValidationResult>();

            // Run function
            var isValid = Validator.TryValidateObject(model, context, validationResults, true);

            // Check results
            Assert.True(isValid);
        }

        [Theory]
        [ClassData(typeof(UserDataInvalid))]
        public void ShouldNotBeValidWhenHasNoPassword_AndIsNotDriver_ValidateUserPasswordAttribute(UserInputModel model)
        {
            // Set up data
            ValidationContext context = new ValidationContext(model);
            var validationResults = new List<ValidationResult>();

            // Run function
            var isValid = Validator.TryValidateObject(model, context, validationResults, true);

            // Check results
            Assert.False(isValid);
        }
    }
}
