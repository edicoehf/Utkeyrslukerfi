using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Repositories.Context;
using Utkeyrslukerfi.API.Repositories.Interfaces;
using Utkeyrslukerfi.API.Models.Exceptions;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Models.Envelope;
using Utkeyrslukerfi.API.Repositories.IContext;

namespace Utkeyrslukerfi.API.Repositories.Implementations
{
    public class PackageRepository : IPackageRepository
    {
        private readonly IUtkeyrslukerfiDbContext _dbContext;
        private readonly IMapper _mapper;

        public PackageRepository(IMapper mapper, IUtkeyrslukerfiDbContext dbContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public PackageDetailsDTO GetPackage(string DeliveryID, string ID)
        {
            var delivery = _dbContext.Deliveries.FirstOrDefault(d => d.ID == DeliveryID);
            if (delivery == null) { throw new NotFoundException("Delivery not found!"); }
            var package = _dbContext.Packages.FirstOrDefault(p => p.ID == ID);
            if (package == null) { throw new NotFoundException("Package not found!"); }
            return _mapper.Map<PackageDetailsDTO>(package);
        }
        public IEnumerable<PackageDetailsDTO> GetPackages(string ID, int pageSize, int pageNumber)
        {
            var packages = _dbContext.Packages.Where(p => p.Delivery.ID == ID);
            Envelope<Package> envelope = new Envelope<Package>(pageNumber, pageSize, packages);
            return _mapper.Map<IEnumerable<PackageDetailsDTO>>(envelope.Items);
        }
        public PackageDTO CreatePackage(string DeliveryID, PackageInputModel package)
        {
            var delivery = _dbContext.Deliveries.FirstOrDefault(d => d.ID == DeliveryID);
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