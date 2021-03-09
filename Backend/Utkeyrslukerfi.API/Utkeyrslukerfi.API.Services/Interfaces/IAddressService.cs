using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;

namespace Utkeyrslukerfi.API.Services.Interfaces
{
    public interface IAddressService
    {
        AddressDTO GetAddress(int ID);
    }
}