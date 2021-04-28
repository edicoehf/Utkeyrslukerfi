using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Services.Interfaces
{
    public interface IAddressService
    {
        AddressDTO GetAddress(int ID);
        Address CreateAddress(AddressInputModel address);
    }
}