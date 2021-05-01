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
            var entity = _dbContext.Vehicles.FirstOrDefault(v => v.LicensePlate == ID);
            if (entity == null) { return null; }
            return _mapper.Map<VehicleDTO>(entity);
        }

        public VehicleDTO CreateVehicle(VehicleInputModel vehicle)
        {
            var entity = new Vehicle
            {
                // vehicle properties
            };
            _dbContext.Vehicles.Add(entity);
            _dbContext.SaveChanges();
            return null;
        }

        public void UpdateVehicle(VehicleInputModel vehicle, string id)
        {
            // TODO:
            // _dbContext.SaveChanges();
        }

        public IEnumerable<VehicleDTO> GetVehicles()
        {
            var vehicles = _dbContext.Vehicles.ToList();
            return _mapper.Map<IEnumerable<VehicleDTO>>(vehicles);
        }

    }
}