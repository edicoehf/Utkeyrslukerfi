using System;
using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Services.Interfaces
{
    public interface IVehicleService
    {
        VehicleDTO GetVehicle(string id); // id = number plate
        IEnumerable<VehicleDTO> GetVehicles(int pageSize, int pageNumber);
        Guid CreateVehicle(VehicleInputModel vehicle);
        void UpdateVehicle(VehicleInputModel vehicle, string id);
    }
}