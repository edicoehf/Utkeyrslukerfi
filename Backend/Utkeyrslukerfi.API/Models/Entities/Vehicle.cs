using System.Collections.Generic;

namespace Utkeyrslukerfi.API.Models.Entities {
    public class Vehicle {
        public int ID { get ; set; }
        public string LicensePlate { get; set; }
        public double Length { get; set; }
        public double Height { get; set; }
        public double Width { get; set; }

        // Navigation Properties
        public List<Delivery> Deliveries { get; set; }
    }
}