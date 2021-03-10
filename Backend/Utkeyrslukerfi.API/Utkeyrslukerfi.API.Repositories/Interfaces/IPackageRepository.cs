using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Repositories.Interfaces
{
    public interface IPackageRepository
    {
        PackageDetailsDTO GetPackage(string ID);
        IEnumerable<PackageDetailsDTO> GetPackages();
        PackageDTO CreatePackage(PackageInputModel package);
    }
}