using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.Entities;

namespace Utkeyrslukerfi.API.Repositories.Interfaces{
    public interface IAddressRepository {
        AddressDTO GetAddress(string ID);
        Address CreateAddress(string streetName, string houseNumber, string zipCode, string city, string country);
    }
}