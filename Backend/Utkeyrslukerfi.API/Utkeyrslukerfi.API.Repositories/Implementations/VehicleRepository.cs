using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Repositories.Context;
using Utkeyrslukerfi.API.Repositories.IContext;
using Utkeyrslukerfi.API.Repositories.Interfaces;
using Utkeyrslukerfi.API.Models.Envelope;
using Utkeyrslukerfi.API.Models.Exceptions;

namespace Utkeyrslukerfi.API.Repositories.Implementations
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly IUtkeyrslukerfiDbContext _dbContext;
        private readonly IMapper _mapper;
        public VehicleRepository(IMapper mapper, IUtkeyrslukerfiDbContext dbContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public VehicleDTO GetVehicle(string ID)
        {
            // // Find the vehicle in the database.
            var entity = _dbContext.Vehicles.FirstOrDefault(v => v.LicensePlate == ID);
            // If it does not exist, return null, throws not found exception
            if (entity == null) { throw new NotFoundException($"Did not find Vehicle with id: {ID}"); }
            // If exists then map the vehicle according to DTO and return.
            return _mapper.Map<VehicleDTO>(entity);
        }
        public IEnumerable<VehicleDTO> GetVehicles(int pageSize, int pageNumber)
        {
            // Find all vehicles
            var vehicles = _dbContext.Vehicles;
            // Put vehicles in an envelope according to the envelope size and fragment.
            Envelope<Vehicle> envelope = new Envelope<Vehicle>(pageNumber, pageSize, vehicles);
            // Return the list of the vehicles mapped according to the DTO
            return _mapper.Map<IEnumerable<VehicleDTO>>(envelope.Items);
        }
        public Guid CreateVehicle(VehicleInputModel vehicle)
        {
            // Find the vehicle in the database.
            var tempVehicle = _dbContext.Vehicles.FirstOrDefault(v => v.LicensePlate == vehicle.LicensePlate);
            // It is not email exception, but it works exactly the same.
            // If the vehicle does exist, then it will throw an expection notifying that the vehicle already exists.
            if (tempVehicle != null) { throw new EmailAlreadyExistsException($"Vehicle with License Plate: {vehicle.LicensePlate} already exists!"); }
            // Create a new vehicle entity
            var entity = new Vehicle
            {
                LicensePlate = vehicle.LicensePlate,
                Length = vehicle.Length,
                Height = vehicle.Height,
                Width = vehicle.Width
            };
            // Add newly created vehicle entity at database
            _dbContext.Vehicles.Add(entity);
            // Finally save the changes that were made in database
            _dbContext.SaveChanges();
            // Return the id of the entity that was created 
            return entity.ID;
        }
        public void UpdateVehicle(VehicleInputModel vehicle, string id)
        {
            // TODO:
            // _dbContext.SaveChanges();
        }
    }
}