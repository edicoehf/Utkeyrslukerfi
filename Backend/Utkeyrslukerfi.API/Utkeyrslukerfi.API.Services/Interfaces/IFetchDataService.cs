using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Utkeyrslukerfi.API.Models.Entities;
using Microsoft.Extensions.Configuration;

namespace Utkeyrslukerfi.API.Services.Interfaces
{
    public interface IFetchDataService
    {
        Task<IEnumerable<Delivery>> GetDeliveries();
    }
}