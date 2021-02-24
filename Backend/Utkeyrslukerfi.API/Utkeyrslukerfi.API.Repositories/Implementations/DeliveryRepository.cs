using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.Entities;
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
            var delivery = _dbContext.Deliveries.FirstOrDefault(d => d.ID == ID);
            if( delivery == null){
                // TODO implement Excepition handling
                System.Console.WriteLine($"Fann ekki delivery með id {ID}");
                return null;
            }
            // loading the foreign key values
            _dbContext.Entry(delivery).Reference(c => c.DeliveryAddress).Load();
            _dbContext.Entry(delivery).Reference(c => c.PickupAddress).Load();
            _dbContext.Entry(delivery).Reference(c => c.Driver).Load();
            _dbContext.Entry(delivery).Reference(c => c.Vehicle).Load();
            // fetcing all the packages
            delivery.Packages = new List<Package>(
              from item in _dbContext.Packages
              where item.Delivery.ID == delivery.ID
              select new Package{
                ID = item.ID,
                Weight = item.Weight,
                Length = item.Length,
                Height = item.Height,
                Width = item.Width
              }
            );

            return _mapper.Map<DeliveryDTO>(delivery);
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