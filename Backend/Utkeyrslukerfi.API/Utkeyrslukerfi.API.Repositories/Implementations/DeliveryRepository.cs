using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Repositories.Context;
using Utkeyrslukerfi.API.Repositories.Interfaces;
using Utkeyrslukerfi.API.Models.Exceptions;
using Utkeyrslukerfi.API.Models.Envelope;
using Microsoft.EntityFrameworkCore;

namespace Utkeyrslukerfi.API.Repositories.Implementations
{
    public class DeliveryRepository : IDeliveryRepository
    {
        private readonly UtkeyrslukerfiDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IAddressRepository _addressRepository;
        private readonly IEnumerable<Delivery> _deliveryObj;

        public DeliveryRepository(IMapper mapper, UtkeyrslukerfiDbContext dbContext, IAddressRepository addressRepository)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _addressRepository = addressRepository;
            _deliveryObj = _dbContext.Deliveries
                            .Include(d => d.PickupAddress)
                            .Include(d => d.DeliveryAddress)
                            .Include(d => d.Driver)
                            .Include(d => d.Vehicle)
                            .Include(d => d.Packages);
        }

        public DeliveryDTO GetDelivery(string ID)
        {
            var delivery = _deliveryObj.FirstOrDefault(d => d.ID == ID);
            if (delivery == null)
            {
                throw new NotFoundException($"Did not find delivery with id {ID}");
            }

            return _mapper.Map<DeliveryDTO>(delivery);
        }

        public IEnumerable<DeliveryDTO> GetDeliveries(int pageSize, int pageNumber)
        {
            var deliveries = _deliveryObj.ToList();
            Envelope<Delivery> envelope = new(pageNumber, pageSize, deliveries);
            return _mapper.Map<IEnumerable<DeliveryDTO>>(envelope.Items);
        }

        public IEnumerable<DeliveryDTO> GetDeliveriesByStatus(int status, int pageSize, int pageNumber)
        {
            var deliveries = _deliveryObj.ToList();

            Envelope<Delivery> envelope = new(pageNumber, pageSize, deliveries);
            return _mapper.Map<IEnumerable<DeliveryDTO>>(envelope.Items);
        }

        public DeliveryDTO CreateDelivery(DeliveryInputModel delivery)
        {
            // Get Driver
            var driver = _dbContext.Users.FirstOrDefault(u => u.ID == delivery.DriverID);
            if (driver == null) { throw new NotFoundException("User not found."); }

            // Get vehicle
            var vehicle = _dbContext.Vehicles.FirstOrDefault(v => v.ID == delivery.VehicleID);
            if (vehicle == null) { throw new NotFoundException("Vehicle not registered."); }
            System.Console.WriteLine("Street name: ", delivery.PickupAddressStreetName);

            // Create PickupAddress
            var pickupAddress = new Address
            {
                StreetName = delivery.PickupAddressStreetName,
                HouseNumber = delivery.PickupAddressHouseNumber,
                ZipCode = delivery.PickupAddressZipCode,
                Country = delivery.PickupAddressCountry,
                City = delivery.PickupAddressCity,
            };

            _dbContext.Addresses.Add(pickupAddress);


            // Create DeliveryAddress
            var deliveryAddress = new Address
            {
                StreetName = delivery.DeliveryAddressStreetName,
                HouseNumber = delivery.DeliveryAddressHouseNumber,
                ZipCode = delivery.DeliveryAddressZipCode,
                City = delivery.DeliveryAddressCity,
                Country = delivery.DeliveryAddressCountry
            };

            _dbContext.Addresses.Add(pickupAddress);

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

            return _mapper.Map<DeliveryDTO>(entity);
        }

        public void UpdateDelivery(DeliveryInputModel delivery, string id)
        {
            // Get delivery
            var tempDelivery = _dbContext.Deliveries.FirstOrDefault(d => d.ID == id);
            if (tempDelivery == null) { throw new NotFoundException("Delivery not found."); }
            // Get vehicle
            // TODO: Add check if vehicle is 0
            var vehicle = _dbContext.Vehicles.FirstOrDefault(v => v.ID == delivery.VehicleID);
            if (vehicle == null) { throw new NotFoundException("Vehicle not found!"); }
            // Get driver 
            var driver = _dbContext.Users.FirstOrDefault(u => u.ID == delivery.DriverID);
            if (driver == null) { throw new NotFoundException("Driver is not found."); }

            // Get pickupAddress
            var pickupAddress = _dbContext.Addresses.FirstOrDefault(a => a.ID == tempDelivery.PickupAddressID);
            if (pickupAddress == null) { throw new NotFoundException("Pickup Address not found."); }
            System.Console.Write("delivery: " + tempDelivery.DeliveryAddressID);
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
            tempDelivery.PickupAddressID = delivery.PickupAddressID;
            tempDelivery.PickupAddress = pickupAddress;
            tempDelivery.DeliveryAddressID = delivery.DeliveryAddressID;
            tempDelivery.DeliveryAddress = deliveryAddress;
            // Vehicle
            tempDelivery.Vehicle = vehicle;
            tempDelivery.Driver = driver;
            tempDelivery.Packages = tempDelivery.Packages;
            tempDelivery.Signoff = tempDelivery.Signoff;
            // Save changes
            _dbContext.SaveChanges();
        }

        public void UpdateDeliveries(DeliveriesInputModel deliveries)
        {
            for (int i=0; i < deliveries.Deliveries.Length; i++){
                UpdateDelivery(deliveries.Deliveries[i], deliveries.Deliveries[i].ID);
            }
        }
    }
}
