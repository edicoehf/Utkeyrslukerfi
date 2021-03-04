using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Repositories.Interfaces;
using Utkeyrslukerfi.API.Services.Interfaces;

namespace Utkeyrslukerfi.API.Services.Implementations
{
    public class PackageService : IPackageService
    {
        private readonly IPackageRepository _packageRepo;
        public PackageService(IPackageRepository packageRepository)
        {
            _packageRepo = packageRepository;
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
            return _packageRepo.CreatePackage(package);
        }
    }
}