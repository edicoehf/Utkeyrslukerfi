using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Repositories.IContext;
using Utkeyrslukerfi.API.Repositories.Interfaces;
using Utkeyrslukerfi.API.Models.Envelope;
using Utkeyrslukerfi.API.Models.Exceptions;

namespace Utkeyrslukerfi.API.Repositories.Implementations
{
    /// <summary>
    /// Implementation of of the Vehicle interface
    /// </summary>
    public class VehicleRepository : IVehicleRepository
    {
        private readonly IUtkeyrslukerfiDbContext _dbContext;
        private readonly IMapper _mapper;
        public VehicleRepository(IMapper mapper, IUtkeyrslukerfiDbContext dbContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        /// <summary>
        /// Gets a vehicle by a given id
        /// Throws an exception if the vehicle does not exist
        /// </summary>
        /// <param name="ID"></param>
        /// <returns>Map the vehicle according to DTO</returns>
        public VehicleDTO GetVehicle(string ID)
        {
            var entity = _dbContext.Vehicles.FirstOrDefault(v => v.LicensePlate == ID);
            if (entity == null) { throw new NotFoundException($"Did not find Vehicle with id: {ID}"); }
            return _mapper.Map<VehicleDTO>(entity);
        }
        /// <summary>
        /// Get the list of all vehicles
        /// page size and page number are optional parameters
        /// </summary>
        /// <param name="pageSize">Optional</param>
        /// <param name="pageNumber">Optional</param>
        /// <returns>Return the list of the vehicles mapped according to the DTO</returns>
        public IEnumerable<VehicleDTO> GetVehicles(int pageSize, int pageNumber)
        {
            var vehicles = _dbContext.Vehicles;
            Envelope<Vehicle> envelope = new Envelope<Vehicle>(pageNumber, pageSize, vehicles);
            return _mapper.Map<IEnumerable<VehicleDTO>>(envelope.Items);
        }
        /// <summary>
        /// Creates a new vehicle
        /// </summary>
        /// <param name="vehicle">Of type VehicleInputModel</param>
        /// <returns>The ID of the newly created vehicle</returns>
        public Guid CreateVehicle(VehicleInputModel vehicle)
        {
            var tempVehicle = _dbContext.Vehicles.FirstOrDefault(v => v.LicensePlate == vehicle.LicensePlate);
            // It is not email exception, but it works exactly the same.
            if (tempVehicle != null) { throw new EmailAlreadyExistsException($"Vehicle with License Plate: {vehicle.LicensePlate} already exists!"); }
            var entity = new Vehicle
            {
                LicensePlate = vehicle.LicensePlate,
                Length = vehicle.Length,
                Height = vehicle.Height,
                Width = vehicle.Width
            };
            _dbContext.Vehicles.Add(entity);
            _dbContext.SaveChanges();
            return entity.ID;
        }
        /// <summary>
        /// Updates an existing vehicle
        /// </summary>
        /// <param name="vehicle">Of type VehicleInputModel</param>
        /// <param name="id">Of type Guid</param>
        /// <returns>The ID of the newly created vehicle</returns>
        public void UpdateVehicle(VehicleInputModel vehicle, Guid id)
        {
            var tempVehicle = _dbContext.Vehicles.FirstOrDefault(v => v.ID == id);
            if (tempVehicle == null) { throw new NotFoundException($"User with id: {id} is not found!"); }
            tempVehicle.LicensePlate = vehicle.LicensePlate;
            tempVehicle.Length = vehicle.Length;
            tempVehicle.Height = vehicle.Height;
            tempVehicle.Width = vehicle.Width;

            _dbContext.SaveChanges();
        }
    }
}