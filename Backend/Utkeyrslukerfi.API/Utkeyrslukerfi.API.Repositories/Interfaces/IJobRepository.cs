using Newtonsoft.Json.Linq;

namespace Utkeyrslukerfi.API.Repositories.Interfaces
{
    public interface IJobRepository
    {
        void AddDelivery(JToken delivery);
        void SeedUser();
    }
}