using System.ComponentModel.DataAnnotations;

namespace Utkeyrslukerfi.API.Models.InputModels
{
    public class AddressInputModel
    {
        [Required(ErrorMessage = "Street name is required")]
        public string StreetName { get; set; }
        [Required(ErrorMessage = "Home number is required")]
        public string HouseNumber { get; set; }
        [Required(ErrorMessage = "ZIP Code is required")]
        public string ZipCode { get; set; }
        [Required(ErrorMessage = "City is required")]
        public string City { get; set; }
        public string Country { get; set; }
    }
}