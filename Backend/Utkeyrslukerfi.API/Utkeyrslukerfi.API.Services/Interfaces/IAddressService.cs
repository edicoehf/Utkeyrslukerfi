using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Services.Interfaces{
    public interface IAddressService{
        AddressDTO GetAddress(int ID);
        IEnumerable<AddressDTO> GetAddresses();
        AddressDTO CreateAddress(AddressInputModel address);
        void UpdateAddress(AddressInputModel address, string id);
    }
}