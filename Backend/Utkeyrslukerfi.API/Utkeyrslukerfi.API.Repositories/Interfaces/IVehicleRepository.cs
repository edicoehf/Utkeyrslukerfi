using System;
using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Repositories.Interfaces
{
    /// <summary>
    /// Interface of the Vehicle repository
    /// GetVehicle - Takes one parameter, ID
    /// GetVehicles - Takes two optional parameters from the query, page size and page nubmer for the pagination
    /// CreateVehicle - Creates a vehicle - Takes a vehicle object as defined at input models
    /// UpdateVehicle - Updates a vehicle with a particular ID - Takes a vehicle object and the ID of 
    /// the object that will be updated.
    /// </summary>
    public interface IVehicleRepository
    {
        VehicleDTO GetVehicle(string ID);
        IEnumerable<VehicleDTO> GetVehicles(int pageSize, int pageNumber);
        Guid CreateVehicle(VehicleInputModel vehicle);
        void UpdateVehicle(VehicleInputModel vehicle, Guid ID);
    }
}