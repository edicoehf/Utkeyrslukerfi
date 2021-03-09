using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Repositories.Context;
using Utkeyrslukerfi.API.Repositories.Interfaces;
using Utkeyrslukerfi.API.Models.Exceptions;

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
            var delivery = _dbContext.Deliveries.FirstOrDefault(d => d.ID == ID);
            if (delivery == null)
            {
                throw new NotFoundException($"Did not found delivery with id {ID}");
            }
            // loading the foreign key values
            _dbContext.Entry(delivery).Reference(c => c.DeliveryAddress).Load();
            _dbContext.Entry(delivery).Reference(c => c.PickupAddress).Load();
            _dbContext.Entry(delivery).Reference(c => c.Driver).Load();
            _dbContext.Entry(delivery).Reference(c => c.Vehicle).Load();
            // fetcing all the packages
            delivery.Packages = new List<Package>(
              from item in _dbContext.Packages
              where item.Delivery.ID == delivery.ID
              select new Package
              {
                  ID = item.ID,
                  Weight = item.Weight,
                  Length = item.Length,
                  Height = item.Height,
                  Width = item.Width
              }
            );

            return _mapper.Map<DeliveryDTO>(delivery);
        }

        public IEnumerable<DeliveryDTO> GetDeliveries(int status)
        {
            // TODO: Fix it so if status can be by default null and you can get everything if that is the case
            var deliveries = _dbContext.Deliveries.Where(d => d.Status == status).ToList();
            foreach (var delivery in deliveries) {
                _dbContext.Entry(delivery).Reference(c => c.DeliveryAddress).Load();
                _dbContext.Entry(delivery).Reference(c => c.PickupAddress).Load();
                _dbContext.Entry(delivery).Reference(c => c.Driver).Load();
                _dbContext.Entry(delivery).Reference(c => c.Vehicle).Load();
                // fetcing all the packages
                delivery.Packages = new List<Package>(
                from item in _dbContext.Packages
                where item.Delivery.ID == delivery.ID
                select new Package
                {
                    ID = item.ID,
                    Weight = item.Weight,
                    Length = item.Length,
                    Height = item.Height,
                    Width = item.Width
                }
                );
            }

            return _mapper.Map<IEnumerable<DeliveryDTO>>(deliveries);
        }

        public DeliveryDTO CreateDelivery(DeliveryInputModel delivery)
        {
            // Get Driver
            var driver = _dbContext.Users.FirstOrDefault(u => u.ID == delivery.DriverID);
            if (driver == null) { throw new NotFoundException("User not found."); }

            // Get vehicle
            var vehicle = _dbContext.Vehicles.FirstOrDefault(v => v.ID == delivery.VehicleID);
            if (vehicle == null) { throw new NotFoundException("Vehicle not registered."); }

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
                DriverComment = delivery.DriverComment,
                CustomerComment = delivery.CustomerComment,
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

            return _mapper.Map<DeliveryDTO>(entity);
        }

        public void UpdateDelivery(DeliveryInputModel delivery, string id)
        {
            // Get delivery
            var tempDelivery = _dbContext.Deliveries.FirstOrDefault(d => d.ID == id);
            if (tempDelivery == null) { throw new NotFoundException("Delivery not found."); }

            // Get vehicle
            var vehicle = _dbContext.Vehicles.FirstOrDefault(v => v.ID == delivery.VehicleID);
            if (vehicle == null) { throw new NotFoundException("Vehicle not found!"); }

            // Get driver 
            var driver = _dbContext.Users.FirstOrDefault(u => u.ID == delivery.DriverID);
            if (driver == null) { throw new NotFoundException("User not found."); }

            // Get pickupAddress
            var pickupAddress = _dbContext.Addresses.FirstOrDefault(a => a.ID == tempDelivery.PickupAddressID);
            if (pickupAddress == null) { throw new NotFoundException("Pickup Address not found."); }

            // Get deliveryAddress
            var deliveryAddress = _dbContext.Addresses.FirstOrDefault(a => a.ID == tempDelivery.DeliveryAddressID);
            if (deliveryAddress == null) { throw new NotFoundException("Delivery Address not found."); }

            // Delivery
            tempDelivery.Recipient = delivery.Recipient;
            tempDelivery.DriverComment = delivery.DriverComment;
            tempDelivery.CustomerComment = delivery.CustomerComment;
            tempDelivery.Seller = delivery.Seller;
            tempDelivery.Status = delivery.Status;
            // Address
            tempDelivery.PickupAddressID = pickupAddress.ID;
            tempDelivery.PickupAddress = pickupAddress;
            tempDelivery.DeliveryAddressID = deliveryAddress.ID;
            tempDelivery.DeliveryAddress = deliveryAddress;
            // Vehicle
            tempDelivery.Vehicle = vehicle;
            tempDelivery.Driver = driver;
            tempDelivery.Packages = tempDelivery.Packages;
            tempDelivery.Signoff = tempDelivery.Signoff;
            // Save changes
            _dbContext.SaveChanges();
        }
    }
}
