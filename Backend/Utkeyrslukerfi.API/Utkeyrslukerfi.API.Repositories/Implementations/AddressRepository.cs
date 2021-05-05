using System;
using System.Linq;
using AutoMapper;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Repositories.IContext;
using Utkeyrslukerfi.API.Repositories.Interfaces;
using Utkeyrslukerfi.API.Models.Exceptions;

namespace Utkeyrslukerfi.API.Repositories.Implementations
{
    public class AddressRepository : IAddressRepository
    {
        private readonly IUtkeyrslukerfiDbContext _dbContext;
        private readonly IMapper _mapper;
        public AddressRepository(IMapper mapper, IUtkeyrslukerfiDbContext dbContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public AddressDTO GetAddress(Guid ID)
        {
            // Find the address with the given ID
            var entity = _dbContext.Addresses.FirstOrDefault(a => a.ID == ID);
            // If it does not exist, return null, throws not found exception
            if (entity == null) { throw new NotFoundException($"No Address with ID: {ID}"); }
            // If exists then map the address according to DTO and return.
            return _mapper.Map<AddressDTO>(entity);
        }
        public Guid CreateAddress(AddressInputModel address)
        {
            // Create a new address entity
            var entity = new Address
            {
                StreetName = address.StreetName,
                HouseNumber = address.HouseNumber,
                ZipCode = address.ZipCode,
                Country = address.Country,
                City = address.City
            };
            // Add newly created address entity at database
            _dbContext.Addresses.Add(entity);
            // Finally save the changes that were made in database
            _dbContext.SaveChanges();
            // Return the id of the entity that was created 
            return entity.ID;
        }
    }
}