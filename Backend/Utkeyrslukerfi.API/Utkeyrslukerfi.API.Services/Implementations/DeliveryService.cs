using System.Collections.Generic;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Repositories.Interfaces;
using Utkeyrslukerfi.API.Services.Interfaces;

namespace Utkeyrslukerfi.API.Services.Implementations{
    public class DeliveryService : IDeliveryService {
        private readonly IDeliveryRepository _deliveryRepo;

        public DeliveryService(IDeliveryRepository deliveryRepository){
            _deliveryRepo = deliveryRepository;
        }

        public DeliveryDTO GetDelivery(string ID){
            return _deliveryRepo.GetDelivery(ID);
        }
        public IEnumerable<DeliveryDTO> GetDeliveries(int status){
            return _deliveryRepo.GetDeliveries(status);
        }
        public DeliveryDTO CreateDelivery(DeliveryInputModel delivery){
            return _deliveryRepo.CreateDelivery(delivery);
        }
        public void UpdateDelivery(DeliveryInputModel delivery, string id){
            _deliveryRepo.UpdateDelivery(delivery, id);
        }
    }
}