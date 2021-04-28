using System.Linq;
using AutoMapper;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Repositories.Context;
using Utkeyrslukerfi.API.Repositories.Interfaces;

namespace Utkeyrslukerfi.API.Repositories.Implementations
{
    public class AddressRepository : IAddressRepository
    {
        private readonly UtkeyrslukerfiDbContext _dbContext;
        private readonly IMapper _mapper;

        public AddressRepository(IMapper mapper, UtkeyrslukerfiDbContext dbContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public AddressDTO GetAddress(int ID)
        {
            var entity = _dbContext.Addresses.FirstOrDefault(a => a.ID == ID);
            if (entity == null) { return null; }
            return _mapper.Map<AddressDTO>(entity);
        }

        public Address CreateAddress(AddressInputModel address)
        {
            var entity = new Address
            {
                StreetName = address.StreetName,
                HouseNumber = address.HouseNumber,
                ZipCode = address.ZipCode,
                Country = address.Country,
                City = address.City
            };
            _dbContext.Addresses.Add(entity);
            _dbContext.SaveChanges();
            return entity;
        }
    }
}