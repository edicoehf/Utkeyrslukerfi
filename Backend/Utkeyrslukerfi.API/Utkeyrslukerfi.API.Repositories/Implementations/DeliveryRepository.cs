using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Repositories.Interfaces;
using Utkeyrslukerfi.API.Models.Exceptions;
using Utkeyrslukerfi.API.Models.Envelope;
using Microsoft.EntityFrameworkCore;
using Utkeyrslukerfi.API.Repositories.IContext;

namespace Utkeyrslukerfi.API.Repositories.Implementations
{
    public class DeliveryRepository : IDeliveryRepository
    {
        private readonly IUtkeyrslukerfiDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IAddressRepository _addressRepository;
        private readonly IEnumerable<Delivery> _deliveryObj;

        public DeliveryRepository(IMapper mapper, IUtkeyrslukerfiDbContext dbContext, IAddressRepository addressRepository)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _addressRepository = addressRepository;
            _deliveryObj = _dbContext.Deliveries
                            .Include(d => d.PickupAddress)
                            .Include(d => d.DeliveryAddress)
                            .Include(d => d.Driver)
                            .Include(d => d.Vehicle)
                            .Include(d => d.Packages)
                            .Include(d => d.Signoff);
        }
        /// <summary>
        /// Find and returns a Delivery with a given ID
        /// </summary>
        /// <param name="ID">ID of the Delivery (Required)</param>
        /// <returns>Returns a Delivery DTO</returns>
        public DeliveryDTO GetDelivery(string ID)
        {
            var delivery = _deliveryObj.FirstOrDefault(d => d.ID == ID);
            if (delivery == null) { throw new NotFoundException($"No delivery with ID: {ID}"); }
            return _mapper.Map<DeliveryDTO>(delivery);
        }
        /// <summary>
        /// Find and returns all Deliveries
        /// Put deliveries in an envelope according to the envelope size and fragment.
        /// </summary>
        /// <param name="pageSize">Optional parameter for the list size.</param>
        /// <param name="pageNumber">Optional parameter for the fragment of a delivery list.</param>
        /// <returns>Return the list of the deliveries mapped according to the DTO</returns>
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
        // Refactor Create Delivery, To Create everything inside the Input model
        // this is not importat since this is not used. it was just thought of for
        // if there needs to be a middleware to create deliveries from other systems
        public DeliveryDTO CreateDelivery(DeliveryInputModel delivery)
        {
            // Get Driver
            // var driver = _dbContext.Users.FirstOrDefault(u => u.ID == delivery.DriverID);
            // if (driver == null) { throw new NotFoundException("User not found."); }

            // // Get vehicle
            // var vehicle = _dbContext.Vehicles.FirstOrDefault(v => v.ID == delivery.VehicleID);
            // if (vehicle == null) { throw new NotFoundException("Vehicle not registered."); }

            // Create PickupAddress
            // var pickupAddress = new Address
            // {
            //     StreetName = delivery.PickupAddressStreetName,
            //     HouseNumber = delivery.PickupAddressHouseNumber,
            //     ZipCode = delivery.PickupAddressZipCode,
            //     Country = delivery.PickupAddressCountry,
            //     City = delivery.PickupAddressCity,
            // };

            // _dbContext.Addresses.Add(pickupAddress);


            // // Create DeliveryAddress
            // var deliveryAddress = new Address
            // {
            //     StreetName = delivery.DeliveryAddressStreetName,
            //     HouseNumber = delivery.DeliveryAddressHouseNumber,
            //     ZipCode = delivery.DeliveryAddressZipCode,
            //     City = delivery.DeliveryAddressCity,
            //     Country = delivery.DeliveryAddressCountry
            // };

            // _dbContext.Addresses.Add(deliveryAddress);

            // Create Delivery
            // var entity = new Delivery
            // {
            //     ID = delivery.ID,
            //     Recipient = delivery.Recipient,
            //     Seller = delivery.Seller,
            //     DriverComment = delivery.DriverComment,
            //     CustomerComment = delivery.CustomerComment,
            //     Status = delivery.Status,
            //     PickupAddressID = pickupAddress.ID,
            //     PickupAddress = pickupAddress,
            //     DeliveryAddressID = deliveryAddress.ID,
            //     DeliveryAddress = deliveryAddress,
            //     Vehicle = vehicle,
            //     Driver = driver,
            //     Packages = null,
            //     Signoff = null
            // };

            // _dbContext.Deliveries.Add(entity);
            // _dbContext.SaveChanges();

            // return _mapper.Map<DeliveryDTO>(entity);
            return new DeliveryDTO();
        }
        /// <summary>
        /// Find a delivery with a given ID and if it exists, then it updates
        /// the delivery whith the new delivery object that was send <inheritdoc./>
        /// </summary>
        /// <param name="newdelivery">Delivery object that will be updated (Required).</param>
        /// <param name="ID">ID of the delivery that will be updated (Required).</param>
        public void UpdateDelivery(DeliveryInputModel newdelivery, string ID)
        {
            var delivery = _deliveryObj.FirstOrDefault(d => d.ID == ID);
            if (delivery == null) { throw new NotFoundException($"No delivery with ID: {ID}"); }
            delivery.Seller = newdelivery.Seller ?? delivery.Seller;
            delivery.Recipient = newdelivery.Recipient ?? delivery.Recipient;
            delivery.DriverComment = newdelivery.DriverComment ?? delivery.DriverComment;
            delivery.CustomerComment = newdelivery.CustomerComment ?? delivery.CustomerComment;
            delivery.Status = newdelivery.Status ?? delivery.Status;

            if (delivery.PickupAddress != null)
            {
                delivery.PickupAddress.City = newdelivery.PickupAddressCity ?? delivery.PickupAddress.City;
                delivery.PickupAddress.Country = newdelivery.PickupAddressCountry ?? delivery.PickupAddress.Country;
                delivery.PickupAddress.HouseNumber = newdelivery.PickupAddressHouseNumber ?? delivery.PickupAddress.HouseNumber;
                delivery.PickupAddress.StreetName = newdelivery.PickupAddressStreetName ?? delivery.PickupAddress.StreetName;
                delivery.PickupAddress.ZipCode = newdelivery.DeliveryAddressZipCode ?? delivery.DeliveryAddress.ZipCode;
            }
            if (delivery.DeliveryAddress != null)
            {
                delivery.DeliveryAddress.City = newdelivery.DeliveryAddressCity ?? delivery.DeliveryAddress.City;
                delivery.DeliveryAddress.Country = newdelivery.DeliveryAddressCountry ?? delivery.DeliveryAddress.Country;
                delivery.DeliveryAddress.HouseNumber = newdelivery.DeliveryAddressHouseNumber ?? delivery.DeliveryAddress.HouseNumber;
                delivery.DeliveryAddress.StreetName = newdelivery.DeliveryAddressStreetName ?? delivery.DeliveryAddress.StreetName;
                delivery.DeliveryAddress.ZipCode = newdelivery.DeliveryAddressZipCode ?? delivery.DeliveryAddress.ZipCode;
            }
            if (delivery.Vehicle != null || newdelivery.VehicleID != null)
            {
                var vId = newdelivery.VehicleID ?? delivery.Vehicle.ID;
                var tempVehicle = _dbContext.Vehicles.FirstOrDefault(v => v.ID == vId);
                delivery.Vehicle = tempVehicle;
            }
            if (delivery.Driver != null || newdelivery.DriverID != null)
            {
                var vId = newdelivery.DriverID ?? delivery.Driver.ID;
                var tempDriver = _dbContext.Users.FirstOrDefault(v => v.ID == vId);
                delivery.Driver = tempDriver;
            }
            if (delivery.Signoff != null)
            {
                delivery.Signoff.ImageURI = newdelivery.SignoffImageURI ?? delivery.Signoff.ImageURI;
                delivery.Signoff.SignatureURI = newdelivery.SignoffSignatureURI ?? delivery.Signoff.SignatureURI;
                delivery.Signoff.Recipient = newdelivery.SignoffRecipient ?? delivery.Signoff.Recipient;
            }

            _dbContext.SaveChanges();
        }
        /// <summary>
        /// Updates all deliveries
        /// </summary>
        /// <param name="deliveries">List of deliveries (Required).</param>
        public void UpdateDeliveries(DeliveriesInputModel deliveries)
        {
            for (int i = 0; i < deliveries.Deliveries.Length; i++)
            {
                UpdateDelivery(deliveries.Deliveries[i], deliveries.Deliveries[i].ID);
            }
        }
    }
}
