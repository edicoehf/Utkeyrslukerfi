using System;
namespace Utkeyrslukerfi.API.Models.Dtos
{
    /// <summary>
    /// Data Transfer Objects, The shape of the data object that we sent to the client.
    /// Vehicle Object has [Id, LicensePlate, Length, Height, Width, CreatedOn, LastUpated]
    /// but at the client we only send [Id, LicensePlate, Length, Height, Width]
    /// </summary>
    public class VehicleDTO
    {
        public Guid ID { get; set; }
        public string LicensePlate { get; set; }
        public double Length { get; set; }
        public double Height { get; set; }
        public double Width { get; set; }
    }
}