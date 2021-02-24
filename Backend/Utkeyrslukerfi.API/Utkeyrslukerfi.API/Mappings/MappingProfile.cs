using AutoMapper;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.Entities;

namespace Utkeyrslukerfi.API{
    public class MappingProfile : Profile{
        public MappingProfile(){
            CreateMap<Delivery, DeliveryDTO>();
            CreateMap<Package, PackageDTO>();
            CreateMap<User, UserDTO>();
            CreateMap<Address, AddressDTO>();
            CreateMap<Vehicle, VehicleDTO>();
        }
    }
}