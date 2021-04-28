using System.Collections;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Repositories.Interfaces;
using Utkeyrslukerfi.API.Services.Helpers;
using Utkeyrslukerfi.API.Services.Interfaces;

namespace Utkeyrslukerfi.API.Services.Implementations
{
  public class FetchDataService : IFetchDataService
  {
    static readonly HttpClient client = new();
    private readonly IMapper _mapper;
    private readonly IConfiguration _config;
    private readonly IFetchDataRepository _fetchDataRepo;

    public FetchDataService(IMapper mapper, IConfiguration config, IFetchDataRepository fetchDataRepo){
      _mapper = mapper;
      _config = config;
      _fetchDataRepo = fetchDataRepo;
    }

    private async Task<IEnumerable<JObject>> GetDeliveriesAsync(string URL, bool flatten, string encapsulatedDataName)
    {
      HttpResponseMessage response = await client.GetAsync(URL);
      response.EnsureSuccessStatusCode();
      return await HttpResponseMessageExtensions.DeserializeJsonToList<JObject>(response, flatten, encapsulatedDataName);
    }

    public Task<IEnumerable<Delivery>> GetDeliveries() {
      // getting the values from the appsettings.json
      string URL = _config.GetSection("ExternalAPIConfig").GetSection("ApiUrl").Value;
      bool flatten = bool.Parse(_config.GetSection("ExternalAPIConfig").GetSection("flattenData").Value);
      string encapsulatedDataName = _config.GetSection("ExternalAPIConfig").GetSection("encapsulatedDataName").Value;

      var response = GetDeliveriesAsync(URL, flatten, encapsulatedDataName);
      response.Wait();

      var mapping = _config.GetSection("ExternalDeliveryMapping");
      var packageMapping = mapping.GetSection("Packages");
      foreach(var item in response.Result){
        _fetchDataRepo.AddPackages(item.SelectToken($".{packageMapping.GetSection("Name").Value}"));
        System.Console.WriteLine("----------------------------------");
      }


      return null;
    }
  }
}