using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Services.Interfaces{
    public interface IDeliveryService{
        DeliveryDTO GetDelivery(string ID);
        IEnumerable<DeliveryDTO> GetDeliveries(int status);
        DeliveryDTO CreateDelivery(DeliveryInputModel delivery);
        void UpdateDelivery(DeliveryInputModel delivery, string id);
    }
}