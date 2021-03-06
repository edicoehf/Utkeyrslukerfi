using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Services.Interfaces{
    public interface IPackageService{
        PackageDTO GetPackage(string ID);
        IEnumerable<PackageDetailsDTO> GetPackages(string id);
        PackageDTO CreatePackage(PackageInputModel package);
    }
}