using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Repositories.Context;
using Utkeyrslukerfi.API.Repositories.Interfaces;
using Utkeyrslukerfi.API.Models.Envelope;
using Utkeyrslukerfi.API.Models.Exceptions;

namespace Utkeyrslukerfi.API.Repositories.Implementations
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly UtkeyrslukerfiDbContext _dbContext;
        private readonly IMapper _mapper;

        public VehicleRepository(IMapper mapper, UtkeyrslukerfiDbContext dbContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public VehicleDTO GetVehicle(string ID)
        {
            var entity = _dbContext.Vehicles.FirstOrDefault(v => v.LicensePlate == ID);
            if (entity == null) { return null; }
            return _mapper.Map<VehicleDTO>(entity);
        }

        public IEnumerable<VehicleDTO> GetVehicles(int pageSize, int pageNumber)
        {
            var vehicles = _dbContext.Vehicles;
            Envelope<Vehicle> envelope = new Envelope<Vehicle>(pageNumber, pageSize, vehicles);
            return _mapper.Map<IEnumerable<VehicleDTO>>(envelope.Items);
        }

        public Guid CreateVehicle(VehicleInputModel vehicle)
        {
            var temp_vehicle = _dbContext.Vehicles.FirstOrDefault(v => v.LicensePlate == vehicle.LicensePlate);
            // It is not email exception, but it works exactly the same.
            if (temp_vehicle != null) { throw new EmailAlreadyExistsException($"Vehicle with License Plate: {vehicle.LicensePlate} already exists!"); }
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

        public void UpdateVehicle(VehicleInputModel vehicle, string id)
        {
            // TODO:
            // _dbContext.SaveChanges();
        }

    }
}