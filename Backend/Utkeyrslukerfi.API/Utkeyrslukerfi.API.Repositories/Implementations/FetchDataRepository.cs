using Newtonsoft.Json.Linq;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Repositories.Context;
using Utkeyrslukerfi.API.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;

namespace Utkeyrslukerfi.API.Repositories.Implementations
{
    public class FetchDataRepository : IFetchDataRepository
    {
        private readonly UtkeyrslukerfiDbContext _dbContext;
        private readonly IConfiguration _config;

        public FetchDataRepository(UtkeyrslukerfiDbContext dbContext, IConfiguration configuration){
            _config = configuration.GetSection("ExternalDeliveryMapping");
            _dbContext = dbContext;
        }
        private Delivery AddRecipient(Delivery delivery, JToken data){
            // check if the config contains [], if it does then 
            // we have to split up the data from that. 
            // e.g. 
            // FullName[0]. This means we only want the first name of the recipient
            // so we have to split the full name we are given, and only use the first name. 
            var conf = _config.GetSection("Recipient").Value;
            if(conf == "null"){
                return delivery;
            }
            if(conf.Contains('[')){

            }
            return delivery.Recipient = data.SelectToken($".{conf}");
        }
        private Delivery AddSeller(Delivery delivery, JToken data){}
        private Delivery AddDriverComment(Delivery delivery, JToken data){
            delivery.DriverComment = data.SelectToken($".{_config.GetSection("DriverComment").Value}");
            return delivery;
        }
        private Delivery AddCustomerComment(Delivery delivery, JToken data){
            delivery.CustomerComment = data.SelectToken($".{_config.GetSection("CustomerComment").Value}");
            return delivery;
        }
        private Delivery AddStatus(Delivery delivery, JToken data){
            delivery.Signoff = _config.GetSection("Status");
            return delivery;
        }
        private Delivery AddPickupAddress(Delivery delivery, JToken data){}
        private Delivery AddDeliveryAddress(Delivery delivery, JToken data){}
        private Delivery AddVehicle(Delivery delivery, JToken data){
            if(_config.GetSection("Vehicle") == "null") {
                return delivery;
            }
            delivery.Vehicle = data.SelectToken($".{_config.GetSection("Vehicle").Value}");
            return delivery;
        }
        private Delivery AddDriver(Delivery delivery, JToken data){
            if(_config.GetSection("Driver") == "null") {
                return delivery;
            }
            delivery.Driver = data.SelectToken($".{_config.GetSection("Driver").Value}");
            return delivery;
        }
        private void AddPackages(Delivery delivery, JToken data){
            // TODO Add the packages to the dbcontext   
            
        }
        private Delivery AddSignoff(Delivery delivery, JToken data){
            delivery.Signoff = _config.GetSection("Signoff").Value;
            return delivery;
        }
        public void AddDelivery(JToken delivery){
            var entity = new Delivery
            {
                ID = delivery.ID,
                Recipient = delivery.Recipient,
                Seller = delivery.Seller,
                DriverComment = delivery.DriverComment,
                CustomerComment = delivery.CustomerComment,
                Status = delivery.Status,
                PickupAddressID = pickupAddress.ID,
                PickupAddress = pickupAddress,
                DeliveryAddressID = deliveryAddress.ID,
                DeliveryAddress = deliveryAddress,
                Vehicle = vehicle,
                Driver = driver,
                Packages = null,
                Signoff = null
            };
            System.Console.WriteLine("halló");
        }
    }
}