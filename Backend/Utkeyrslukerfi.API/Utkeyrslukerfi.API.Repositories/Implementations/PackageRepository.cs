using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Repositories.Context;
using Utkeyrslukerfi.API.Repositories.Interfaces;
using Utkeyrslukerfi.API.Models.Exceptions;
using Utkeyrslukerfi.API.Models.Entities;

namespace Utkeyrslukerfi.API.Repositories.Implementations
{
    public class PackageRepository : IPackageRepository
    {
        private readonly UtkeyrslukerfiDbContext _dbContext;
        private readonly IMapper _mapper;

        public PackageRepository(IMapper mapper, UtkeyrslukerfiDbContext dbContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public PackageDTO GetPackage(string ID)
        {
            return null;
        }
        public IEnumerable<PackageDTO> GetPackages()
        {
            return null;
        }
        public PackageDTO CreatePackage(PackageInputModel package)
        {
            var delivery = _dbContext.Deliveries.FirstOrDefault(d => d.ID == package.DeliveryID);
            if (delivery == null) { throw new NotFoundException("Delivery not found!"); }   
            
            var entity = new Package
            {
                ID = package.ID,
                Weight = package.Weight,
                Length = package.Length,
                Height = package.Height,
                Width = package.Width,
                Delivery = delivery
            };
            _dbContext.Packages.Add(entity);
            _dbContext.SaveChanges();
            
            return _mapper.Map<PackageDTO>(entity);
        }
    }
}