using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Repositories.Interfaces;
using Utkeyrslukerfi.API.Services.Interfaces;

namespace Utkeyrslukerfi.API.Services.Implementations
{
    public class VehicleService : IVehicleService
    {
        private readonly IVehicleRepository _vehicleRepo;

        public VehicleService(IVehicleRepository vehicleRepository)
        {
            _vehicleRepo = vehicleRepository;
        }

        public VehicleDTO GetVehicle(string ID)
        {
            return _vehicleRepo.GetVehicle(ID);
        }
        public IEnumerable<VehicleDTO> GetVehicles()
        {
            return _vehicleRepo.GetVehicles();
        }
        public VehicleDTO CreateVehicle(VehicleInputModel vehicle)
        {
            return _vehicleRepo.CreateVehicle(vehicle);
        }

        public void UpdateVehicle(VehicleInputModel vehicle, string id)
        {
            _vehicleRepo.UpdateVehicle(vehicle, id);
        }
    }
}