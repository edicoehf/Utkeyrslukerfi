using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Repositories.Context;
using Utkeyrslukerfi.API.Repositories.Interfaces;

namespace Utkeyrslukerfi.API.Repositories.Implementations
{
    public class DeliveryRepository : IDeliveryRepository
    {
        private readonly UtkeyrslukerfiDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IAddressRepository _addressRepository;

        public DeliveryRepository(IMapper mapper, UtkeyrslukerfiDbContext dbContext, IAddressRepository addressRepository)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _addressRepository = addressRepository;
        }

        public DeliveryDTO GetDelivery(string ID)
        {
            return null;
        }

        public IEnumerable<DeliveryDTO> GetDeliveries()
        {
            return null;
        }

        public DeliveryDTO CreateDelivery(DeliveryInputModel delivery)
        {
            // Get Driver
            var driver = _dbContext.Users.FirstOrDefault(u => u.ID == delivery.DriverID);
            if (driver == null) { throw new System.Exception("User not found."); }

            // Get vehicle
            var vehicle = _dbContext.Vehicles.FirstOrDefault(v => v.ID == delivery.VehicleID);
            if (vehicle == null) { throw new System.Exception("Vehicle not registered."); }

            // Create PickupAddress
            var pickupAddress = _addressRepository.CreateAddress(
                delivery.PickupAddressStreetName,
                delivery.PickupAddressHouseNumber,
                delivery.PickupAddressZipCode,
                delivery.PickupAddressCity,
                delivery.PickupAddressCountry);

            // Create DeliveryAddress
            var deliveryAddress = _addressRepository.CreateAddress(
                delivery.DeliveryAddressStreetName,
                delivery.DeliveryAddressHouseNumber,
                delivery.DeliveryAddressZipCode,
                delivery.DeliveryAddressCity,
                delivery.DeliveryAddressCountry);

            // Create Delivery
            var entity = new Delivery
            {
                ID = delivery.ID,
                Recipient = delivery.Recipient,
                Seller = delivery.Seller,
                Status = delivery.Status,
                PickupAddressID = pickupAddress.ID,
                PickupAddress = pickupAddress,
                DeliveryAddressID = deliveryAddress.ID,
                DeliveryAddress = deliveryAddress,
                Vehicle = vehicle,
                Driver = driver,
                Packages = null,
                Signoff = null
            };

            _dbContext.Deliveries.Add(entity);
            _dbContext.SaveChanges();

            // TODO: Add delivery id to vehicles list of deliveries
            // TODO: Add packages

            return new DeliveryDTO
            {
                ID = entity.ID,
                Recipient = entity.Recipient,
                Seller = entity.Seller,
                Status = entity.Status,
                Driver = new UserDTO
                {
                    ID = driver.ID,
                    Name = driver.Name,
                    Email = driver.Email,
                    Role = driver.Role
                },
                PickupAddress = new AddressDTO
                {
                    ID = pickupAddress.ID,
                    StreetName = pickupAddress.StreetName,
                    HouseNumber = pickupAddress.HouseNumber,
                    ZipCode = pickupAddress.ZipCode,
                    City = pickupAddress.City,
                    Country = pickupAddress.Country
                },
                DeliveryAddress = new AddressDTO
                {
                    ID = deliveryAddress.ID,
                    StreetName = deliveryAddress.StreetName,
                    HouseNumber = deliveryAddress.HouseNumber,
                    ZipCode = deliveryAddress.ZipCode,
                    City = deliveryAddress.City,
                    Country = deliveryAddress.Country
                },
                Vehicle = new VehicleDTO
                {
                    ID = vehicle.ID,
                    LicensePlate = vehicle.LicensePlate,
                    Length = vehicle.Length,
                    Height = vehicle.Height,
                    Width = vehicle.Width
                },
                Packages = null
            };
        }

        public void UpdateDelivery(DeliveryInputModel delivery, string id)
        {
            System.Console.WriteLine("on top");
            // Get delivery
            var tempDelivery = _dbContext.Deliveries.FirstOrDefault(d => d.ID == id);
            if (tempDelivery == null) { throw new System.Exception("Delivery not found."); }

            // Get vehicle
            var vehicle = _dbContext.Vehicles.FirstOrDefault(v => v.ID == delivery.VehicleID);
            if (vehicle == null) { throw new System.Exception("Vehicle not registered."); }

            var driver = _dbContext.Users.FirstOrDefault(u => u.ID == delivery.DriverID);
            if (driver == null) { throw new System.Exception("User not found."); }

            System.Console.WriteLine("This here!");
            // Delivery
            tempDelivery.ID = delivery.ID;
            tempDelivery.ID = delivery.ID;
            tempDelivery.Recipient = delivery.Recipient;
            tempDelivery.Seller = delivery.Seller;
            tempDelivery.Status = delivery.Status;
            // Address
            // tempDelivery.PickupAddressID = pickupAddress.ID;
            // tempDelivery.PickupAddress = pickupAddress;
            // tempDelivery.DeliveryAddressID = deliveryAddress.ID;
            // tempDelivery.DeliveryAddress = deliveryAddress;
            // Vehicle
            tempDelivery.Vehicle = vehicle;
            tempDelivery.Driver = driver;
            tempDelivery.Packages = null;
            tempDelivery.Signoff = null;
            // Save changes
            _dbContext.SaveChanges();
        }

    }
}