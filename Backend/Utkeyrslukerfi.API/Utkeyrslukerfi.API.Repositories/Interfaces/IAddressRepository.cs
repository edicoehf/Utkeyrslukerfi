using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Models.Entities;

namespace Utkeyrslukerfi.API.Repositories.Interfaces
{
    public interface IAddressRepository
    {
        AddressDTO GetAddress(int ID);
        int CreateAddress(AddressInputModel address);
    }
}