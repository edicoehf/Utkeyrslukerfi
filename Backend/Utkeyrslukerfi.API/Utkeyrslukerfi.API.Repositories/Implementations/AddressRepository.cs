using AutoMapper;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Repositories.Context;
using Utkeyrslukerfi.API.Repositories.Interfaces;

namespace Utkeyrslukerfi.API.Repositories.Implementations{
    public class AddressRepository : IAddressRepository{
        private readonly UtkeyrslukerfiDbContext _dbContext;
        private readonly IMapper _mapper;

        public AddressRepository(IMapper mapper, UtkeyrslukerfiDbContext dbContext){
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public AddressDTO GetAddress(string ID){
            // TODO: implement
            return null;
        }

        public Address CreateAddress(string streetName, string houseNumber, string zipCode, string city, string country){
            var entity = new Address {
                StreetName = streetName,
                HouseNumber = houseNumber,
                ZipCode = zipCode,
                Country = country,
                City = city
            };

            _dbContext.Addresses.Add(entity);
            _dbContext.SaveChanges();

            return entity;
        }
    }
}