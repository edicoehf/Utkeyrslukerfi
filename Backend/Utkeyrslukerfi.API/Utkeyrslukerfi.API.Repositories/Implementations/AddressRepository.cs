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
        /// <summary>
        /// Find the address with the given ID
        /// </summary>
        /// <param name="ID">ID of the Address (Required).</param>
        /// <returns>An Address DTO</returns>
        public AddressDTO GetAddress(Guid ID)
        {
            var entity = _dbContext.Addresses.FirstOrDefault(a => a.ID == ID);
            if (entity == null) { throw new NotFoundException($"No Address with ID: {ID}"); }
            return _mapper.Map<AddressDTO>(entity);
        }
        /// <summary>
        /// Creates a new address
        /// </summary>
        /// <param name="address">Address object that is going to be created (Requried).</param>
        /// <returns>Return the ID of the address that was created </returns>
        public Guid CreateAddress(AddressInputModel address)
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
            return entity.ID;
        }
    }
}