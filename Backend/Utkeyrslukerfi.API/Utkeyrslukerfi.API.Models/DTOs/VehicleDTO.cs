using System;
namespace Utkeyrslukerfi.API.Models.Dtos
{
    public class VehicleDTO
    {
        public Guid ID { get; set; }
        public string LicensePlate { get; set; }
        public double Length { get; set; }
        public double Height { get; set; }
        public double Width { get; set; }
    }
}