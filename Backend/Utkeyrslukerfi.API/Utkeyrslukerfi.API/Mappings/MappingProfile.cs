using AutoMapper;
using Newtonsoft.Json.Linq;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Delivery, DeliveryDTO>();
            CreateMap<Package, PackageDetailsDTO>();
            CreateMap<Package, PackageDTO>();
            CreateMap<User, UserDTO>();
            CreateMap<User, DriverDTO>();
      CreateMap<UserInputModel, UserDTO>();
      CreateMap<UserInputModel, User>();
            CreateMap<Address, AddressDTO>();
            CreateMap<Vehicle, VehicleDTO>();
        }
    }
}