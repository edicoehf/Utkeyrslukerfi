using System.ComponentModel.DataAnnotations;

namespace Utkeyrslukerfi.API.Models.InputModels
{
    public class VehicleInputModel
    {
        [Required(ErrorMessage = "License Plate is required")]
        public string LicensePlate { get; set; }
        [Required(ErrorMessage = "Length is required")]
        public string Length { get; set; }
        [Required(ErrorMessage = "Height is required")]
        public int Height { get; set; }
        [Required(ErrorMessage = "Width is required")]
        public string Width { get; set; }
    }
}