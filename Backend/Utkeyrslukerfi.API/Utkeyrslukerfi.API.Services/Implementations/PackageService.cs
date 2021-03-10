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
        public PackageDetailsDTO GetPackage(string ID)
        {
            return _packageRepo.GetPackage(ID);
        }
        public IEnumerable<PackageDetailsDTO> GetPackages(string id, int pageSize, int pageNumber)
        {
            return _packageRepo.GetPackages(id, pageSize, pageNumber);
        }
        public PackageDTO CreatePackage(PackageInputModel package)
        {
            return _packageRepo.CreatePackage(package);
        }
    }
}