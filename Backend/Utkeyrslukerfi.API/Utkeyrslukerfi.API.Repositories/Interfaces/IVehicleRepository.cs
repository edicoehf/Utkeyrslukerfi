using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Repositories.Interfaces
{
    public interface IVehicleRepository
    {
        VehicleDTO GetVehicle(string ID);
        IEnumerable<VehicleDTO> GetVehicles();
        VehicleDTO CreateVehicle(VehicleInputModel vehicle);
        void UpdateVehicle(VehicleInputModel vehicle, string ID);
    }
}