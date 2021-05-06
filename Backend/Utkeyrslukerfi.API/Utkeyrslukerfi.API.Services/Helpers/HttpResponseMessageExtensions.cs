using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using AutoMapper;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Utkeyrslukerfi.API.Services.Helpers
{
    public static class HttpResponseMessageExtensions
    {
        /// <summary>
        /// This is not used atm, but it's good to have for the future if
        /// we ever need to fetch a single object from a rest api.
        /// </summary>
        /// <param name="response"></param>
        /// <param name="flatten"></param>
        /// <typeparam name="T"></typeparam>
        /// <returns>A object of type T</returns>
        public static async Task<T> DeserializeJsonToObject<T>(this HttpResponseMessage response, bool flatten = false)
        {
            var json = await response.Content.ReadAsStringAsync();
            var jsonObject = JObject.Parse(json);
            var data = jsonObject["data"];
            if (flatten)
            {
                data = FlattenJsonObject(data);
            }
            return JsonConvert.DeserializeObject<T>(data.ToString());
        }

        public static async Task<IEnumerable<T>> DeserializeJsonToList<T>(this HttpResponseMessage response, bool flatten, string encapsulatedDataName)
        {
            var json = await response.Content.ReadAsStringAsync();
            // var jsonObject = JObject.Parse(json);
            // var data = jsonObject["data"];
            // if (flatten)
            // {
            //   data = FlattenJsonArray(data);
            // }
            return JsonConvert.DeserializeObject<IEnumerable<T>>(json);
        }

        private static JToken FlattenJsonObject(JToken jsonToken)
        {
            var newJsonObject = new JObject();
            foreach (var token in jsonToken.OfType<JProperty>())
            {
                token
                    .Descendants()
                    .Where(p => !p.Any())
                    .ToList()
                    .ForEach(j =>
                    {
                        newJsonObject.Add(j.Parent);
                    });
            }

            return newJsonObject;
        }

        private static JToken FlattenJsonArray(JToken jsonToken)
        {
            var newJsonArray = new JArray();

            foreach (var token in jsonToken.OfType<JObject>())
            {
                var jObject = new JObject();

                token
                    .Descendants()
                    .Where(p => !p.Any())
                    .ToList()
                    .ForEach(j =>
                    {
                        jObject.Add(j.Parent);
                    });

                newJsonArray.Add(jObject);
            }

            return newJsonArray;
        }
    }
}