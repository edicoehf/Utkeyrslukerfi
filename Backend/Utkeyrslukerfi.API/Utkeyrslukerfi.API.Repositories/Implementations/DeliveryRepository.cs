using System.Collections.Generic;
using AutoMapper;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Repositories.Context;
using Utkeyrslukerfi.API.Repositories.Interfaces;

namespace Utkeyrslukerfi.API.Repositories.Implementations{
    public class DeliveryRepository : IDeliveryRepository{
        private readonly UtkeyrslukerfiDbContext _dbContext;
        private readonly IMapper _mapper;

        public DeliveryRepository(IMapper mapper, UtkeyrslukerfiDbContext dbContext){
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public DeliveryDTO GetDelivery(string ID){
            return null;
        }

        public IEnumerable<DeliveryDTO> GetDeliveries(){
            return null;
        }

        public DeliveryDTO CreateDelivery(DeliveryInputModel delivery){
            return null;
        }

        public void UpdateDelivery() {
            
        }

    }
}