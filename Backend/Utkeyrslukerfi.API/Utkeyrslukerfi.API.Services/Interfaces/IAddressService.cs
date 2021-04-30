using System;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Services.Interfaces
{
    public interface IAddressService
    {
        AddressDTO GetAddress(Guid ID);
        Guid CreateAddress(AddressInputModel address);
    }
}