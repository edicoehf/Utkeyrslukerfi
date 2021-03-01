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
        public PackageDTO CreatePackage(PackageInputModel Package)
        {
            return null;
        }
    }
}