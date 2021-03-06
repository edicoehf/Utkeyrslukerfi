using System;
using System.ComponentModel.DataAnnotations;
using Utkeyrslukerfi.API.Models.Entities;

namespace Utkeyrslukerfi.API.Models.InputModels
{
    public class DeliveryInputModel
    {
        public string ID { get; set; }
        public string Recipient { get; set; }
        public string Seller { get; set; }
        public string DriverComment { get; set; }
        public string CustomerComment { get; set; }
        public int? Status { get; set; }
        public DateTime? DeliveryDate { get; set; }
        // pickup address
        public string PickupAddressStreetName { get; set; }
        public string PickupAddressHouseNumber { get; set; }
        public string PickupAddressZipCode { get; set; }
        public string PickupAddressCity { get; set; }
        public string PickupAddressCountry { get; set; }
        public string PickupAddressXCoords { get; set; }
        public string PickupAddressYCoords { get; set; }
        // deliveries address
        public string DeliveryAddressStreetName { get; set; }
        public string DeliveryAddressHouseNumber { get; set; }
        public string DeliveryAddressZipCode { get; set; }
        public string DeliveryAddressCity { get; set; }
        public string DeliveryAddressCountry { get; set; }
        public string DeliveryAddressXCoords { get; set; }
        public string DeliveryAddressYCoords { get; set; }
        // vehicle
        public Guid? VehicleID { get; set; }
        public string VehicleLicensePlate { get; set; }
        public double VehicleLength { get; set; }
        public double VehicleHeight { get; set; }
        public double VehicleWidth { get; set; }
        // driver
        public Guid? DriverID { get; set; }
        public string DriverName { get; set; }
        public string DriverPassword { get; set; }
        public string DriverEmail { get; set; }
        public bool DriverChangePassword { get; set; }
        // signoff
        public string SignoffImageURI { get; set; }
        public string SignoffSignatureURI { get; set; }
        public string SignoffRecipient { get; set; }
    }
}