using System.ComponentModel.DataAnnotations;
using Utkeyrslukerfi.API.Models.Entities;

namespace Utkeyrslukerfi.API.Models.InputModels
{
    public class DeliveryInputModel
    {
        public string Recipient { get; set; }
        public string ID { get; set; }
        public string Seller { get; set; }
        public int Status { get; set; }
        // pickup address
        public string PickupAddressStreetName { get; set; }
        public string PickupAddressHouseNumber { get; set; }
        public string PickupAddressZipCode { get; set; }
        public string PickupAddressCity { get; set; }
        public string PickupAddressCountry { get; set; }
        // deliveries address
        public string DeliveryAddressStreetName { get; set; }
        public string DeliveryAddressHouseNumber { get; set; }
        public string DeliveryAddressZipCode { get; set; }
        public string DeliveryAddressCity { get; set; }
        public string DeliveryAddressCountry { get; set; }
        // Foreign keys
        public int VehicleID { get; set; }
        public int DriverID { get; set; }
        public int SignoffID { get; set; }
    }
}