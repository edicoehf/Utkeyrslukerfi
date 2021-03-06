using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Repositories.Interfaces{
    public interface IPackageRepository{
        PackageDTO GetPackage(string ID);
        IEnumerable<PackageDetailsDTO> GetPackages(string ID);
        PackageDTO CreatePackage(PackageInputModel package);
    }
}