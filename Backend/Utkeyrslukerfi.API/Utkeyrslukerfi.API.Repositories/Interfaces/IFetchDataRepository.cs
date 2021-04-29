using Newtonsoft.Json.Linq;

namespace Utkeyrslukerfi.API.Repositories.Interfaces
{
    public interface IFetchDataRepository
    {
        void AddDelivery(JToken delivery);
    }
}