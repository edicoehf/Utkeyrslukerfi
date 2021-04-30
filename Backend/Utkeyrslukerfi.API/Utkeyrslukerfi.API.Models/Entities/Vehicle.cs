using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Utkeyrslukerfi.API.Models.Entities
{
    public class Vehicle
    {
        public Guid ID { get; set; }
        public string LicensePlate { get; set; }
        public double Length { get; set; }
        public double Height { get; set; }
        public double Width { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedOn { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime LastUpdated { get; set; }

        // Navigation Properties
        public List<Delivery> Deliveries { get; set; }
    }
}