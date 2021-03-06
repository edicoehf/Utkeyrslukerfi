using System;
using System.Collections.Generic;

namespace Utkeyrslukerfi.API.Models.Dtos
{
    public class DeliveryDTO
    {
        public string ID { get; set; }
        public string Recipient { get; set; }
        public string Seller { get; set; }
        public string DriverComment { get; set; }
        public string CustomerComment { get; set; }
        public int? Status { get; set; }
        public DateTime DeliveryDate { get; set; }
        public UserDTO Driver { get; set; }
        public AddressDTO PickupAddress { get; set; }
        public AddressDTO DeliveryAddress { get; set; }
        public VehicleDTO Vehicle { get; set; }
        public SignoffDTO Signoff { get; set; }
        public List<PackageDTO> Packages { get; set; }
    }
}