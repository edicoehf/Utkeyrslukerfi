using Newtonsoft.Json.Linq;

namespace Utkeyrslukerfi.API.Repositories.Interfaces
{
    public interface IJobRepository
    {
        void AddDelivery(int index, JToken delivery);
        void SeedUser();
    }
}