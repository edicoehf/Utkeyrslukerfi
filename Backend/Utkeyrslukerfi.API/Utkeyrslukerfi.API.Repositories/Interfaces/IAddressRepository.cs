using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Models.Entities;
using System;

namespace Utkeyrslukerfi.API.Repositories.Interfaces
{
    public interface IAddressRepository
    {
        AddressDTO GetAddress(Guid ID);
        Guid CreateAddress(AddressInputModel address);
    }
}