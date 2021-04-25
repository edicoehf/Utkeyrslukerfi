using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Utkeyrslukerfi.API.Models.Dtos;

namespace Utkeyrslukerfi.API.Services.Interfaces
{
  public interface IFetchDataService
  {
    Task<IEnumerable<DeliveryDTO>> GetDeliveries(string URL, bool flatten, string encapsulatedDataName);
  }
}