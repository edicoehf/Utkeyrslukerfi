using System.ComponentModel.DataAnnotations;

namespace Utkeyrslukerfi.API.Models.InputModels
{
    public class VehicleInputModel
    {
        [Required(ErrorMessage = "License Plate is required")]
        public string LicensePlate { get; set; }
        [Required(ErrorMessage = "Length is required")]
        public double Length { get; set; }
        [Required(ErrorMessage = "Height is required")]
        public double Height { get; set; }
        [Required(ErrorMessage = "Width is required")]
        public double Width { get; set; }
    }
}