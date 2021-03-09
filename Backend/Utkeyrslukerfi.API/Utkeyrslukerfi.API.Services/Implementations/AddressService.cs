using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Repositories.Interfaces;
using Utkeyrslukerfi.API.Services.Interfaces;

namespace Utkeyrslukerfi.API.Services.Implementations{
    public class AddressService : IAddressService {
        private readonly IAddressRepository _addressRepo;

        public AddressService(IAddressRepository addressRepository){
            _addressRepo = addressRepository;
        }

        public AddressDTO GetAddress(int ID){
            return _addressRepo.GetAddress(ID);
        }
    }
}