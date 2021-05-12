using System;

namespace Utkeyrslukerfi.API.Models.Dtos
{
    public class AddressDTO
    {
        public Guid ID { get; set; }
        public string StreetName { get; set; }
        public string HouseNumber { get; set; }
        public string ZipCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
    }
}