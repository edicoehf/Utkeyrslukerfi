using System.ComponentModel.DataAnnotations;
namespace Utkeyrslukerfi.API.Models.InputModels{
    public class PackageInputModel{
        [Required(ErrorMessage = "ID is required")]
        public string ID { get; set; }
        public double Weight { get; set; }
        public double Length { get; set; }
        public double Height { get; set; }
        public double Width { get; set; }
    }
}