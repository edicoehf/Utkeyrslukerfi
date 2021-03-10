using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Repositories.Interfaces
{
    public interface IPackageRepository
    {
        PackageDetailsDTO GetPackage(string DeliveryID, string ID);
        IEnumerable<PackageDetailsDTO> GetPackages(string ID, int pageSize, int pageNumber);
        PackageDTO CreatePackage(string DeliveryID, PackageInputModel package);
    }
}