using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Services.Interfaces
{
    public interface IPackageService
    {
        PackageDetailsDTO GetPackage(string ID);
        IEnumerable<PackageDetailsDTO> GetPackages();
        PackageDTO CreatePackage(PackageInputModel package);
    }
}