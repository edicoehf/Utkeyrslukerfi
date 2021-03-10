using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Services.Interfaces
{
    public interface IPackageService
    {
        PackageDetailsDTO GetPackage(string ID);
        IEnumerable<PackageDetailsDTO> GetPackages();
        IEnumerable<PackageDetailsDTO> GetPackages(string id, int pageSize, int pageNumber);
        PackageDTO CreatePackage(PackageInputModel package);
    }
}