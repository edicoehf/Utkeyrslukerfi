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
    public class JobService : IJobService
    {
        static readonly HttpClient client = new();
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        private readonly IJobRepository _jobRepository;

        public JobService(IMapper mapper, IConfiguration config, IJobRepository jobRepository)
        {
            _mapper = mapper;
            _config = config;
            _jobRepository = jobRepository;
        }
        /// <summary>
        /// Fetches the data from the external API, and returns the data on a Json Object format.
        /// </summary>
        /// <param name="URL">External API url</param>
        /// <param name="flatten">Should the data be flatten or not</param>
        /// <param name="encapsulatedDataName">if the data is encapsulated, you need to pass in the encapsulation name here</param>
        /// <returns>list of json objects</returns>
        private async Task<IEnumerable<JObject>> GetDeliveriesAsync(string URL, bool flatten, string encapsulatedDataName)
        {
            HttpResponseMessage response = await client.GetAsync(URL);
            response.EnsureSuccessStatusCode();
            return await HttpResponseMessageExtensions.DeserializeJsonToList<JObject>(response, flatten, encapsulatedDataName);
        }
        /// <summary>
        /// Async task that adds deliveries to the database
        /// </summary>
        /// <returns>always returns null, can't be void since hangfire calls it</returns>
        public Task<IEnumerable<Delivery>> GetDeliveries()
        {
            // getting the values from the appsettings.json
            string URL = _config.GetSection("ExternalAPIConfig").GetSection("ApiUrl").Value;
            bool flatten = bool.Parse(_config.GetSection("ExternalAPIConfig").GetSection("flattenData").Value);
            string encapsulatedDataName = _config.GetSection("ExternalAPIConfig").GetSection("encapsulatedDataName").Value;

            var response = GetDeliveriesAsync(URL, flatten, encapsulatedDataName);
            response.Wait();

            foreach (var item in response.Result)
            {
                _jobRepository.AddDelivery(item);
            }
            return null;
        }

        public void SeedUser()
        {
            _jobRepository.SeedUser();
        }
    }
}