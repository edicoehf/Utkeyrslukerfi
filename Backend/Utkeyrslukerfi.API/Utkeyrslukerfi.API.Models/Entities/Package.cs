using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Utkeyrslukerfi.API.Models.Entities
{
    public class Package
    {
        public string ID { get; set; }
        public double Weight { get; set; }
        public double Length { get; set; }
        public double Height { get; set; }
        public double Width { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedOn { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime LastUpdated { get; set; }

        // Navigation Properties
        public Delivery Delivery { get; set; }
    }
}