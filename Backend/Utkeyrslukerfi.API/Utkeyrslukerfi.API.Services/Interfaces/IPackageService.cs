using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Services.Interfaces
{
    public interface IPackageService
    {
        PackageDTO GetPackage(string ID);
        IEnumerable<PackageDetailsDTO> GetPackages(string id, int pageSize, int pageNumber);
        PackageDTO CreatePackage(PackageInputModel package);
    }
}