using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Utkeyrslukerfi.API.Models.Entities
{
    public class Address
    {
        public Guid ID { get; set; }
        public string StreetName { get; set; }
        public string HouseNumber { get; set; }
        public string ZipCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string XCoords { get; set; }
        public string YCoords { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedOn { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime LastUpdated { get; set; }
    }
}