using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Repositories.Interfaces{
    public interface IDeliveryRepository{
        DeliveryDTO GetDelivery(string ID);
        IEnumerable<DeliveryDTO> GetDeliveries(int status);
        DeliveryDTO CreateDelivery(DeliveryInputModel delivery);
        void UpdateDelivery(DeliveryInputModel delivery, string id);
    }
}