using System.ComponentModel.DataAnnotations;

namespace Utkeyrslukerfi.API.Models.InputModels
{
    public class DriverLoginInputModel
    {
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }

    }
}