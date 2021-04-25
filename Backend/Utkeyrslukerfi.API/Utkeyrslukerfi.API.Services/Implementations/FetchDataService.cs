using System.Collections;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Services.Helpers;
using Utkeyrslukerfi.API.Services.Interfaces;

namespace Utkeyrslukerfi.API.Services.Implementations
{
  public class FetchDataService : IFetchDataService
  {
    static readonly HttpClient client = new();

    private async Task<IEnumerable<DeliveryDTO>> GetDeliveriesAsync(string URL, bool flatten, string encapsulatedDataName)
    {
      HttpResponseMessage response = await client.GetAsync(URL);
      response.EnsureSuccessStatusCode();
      return await HttpResponseMessageExtensions.DeserializeJsonToList<DeliveryDTO>(response, flatten, encapsulatedDataName);
    }
    public Task<IEnumerable<DeliveryDTO>> GetDeliveries(string URL, bool flatten, string encapsulatedDataName) {
      System.Console.WriteLine(URL);
      return GetDeliveriesAsync(URL, flatten, encapsulatedDataName);
    }
  }
}