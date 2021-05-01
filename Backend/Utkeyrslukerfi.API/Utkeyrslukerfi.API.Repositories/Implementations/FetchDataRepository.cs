using Newtonsoft.Json.Linq;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Repositories.Context;
using Utkeyrslukerfi.API.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using Utkeyrslukerfi.API.Repositories.Helpers;

namespace Utkeyrslukerfi.API.Repositories.Implementations
{
    public class FetchDataRepository : IFetchDataRepository
    {
        private readonly IUtkeyrslukerfiDbContext _dbContext;
        private readonly IConfiguration _config;

        public FetchDataRepository(IUtkeyrslukerfiDbContext dbContext, IConfiguration configuration)
        {
            _config = configuration.GetSection("ExternalDeliveryMapping");
            _dbContext = dbContext;
        }
        /// <summary>
        /// Takes in a string on the format "attribute[index]"
        /// finds the data assosiated with the attribute from the api response
        /// and splits it, and returns the data at the index index
        /// </summary>
        /// <param name="conf">attributete[index]</param>
        /// <param name="data">api response in json format</param>
        /// <returns>A string of the data needed from api response</returns>
        private String HandleBrackets(String conf, JToken data)
        {
            int lBracketIdx = conf.IndexOf('[');
            int rBracketIdx = conf.IndexOf(']');
            string dataToken = conf.Substring(0, lBracketIdx);
            // parsing the index, by substringing from the index of '['
            // and goes forward x amount of chars, where x is the difference between
            // index of '[' to ']' 
            int index = Int32.Parse(conf.Substring(lBracketIdx + 1, (rBracketIdx - lBracketIdx - 1)));
            var tokenData = data.SelectToken($".{dataToken}").ToString();
            return tokenData.Split(' ')[index];
        }
        /// <summary>
        /// takes in the delivery that was created in the AddDelivery method
        /// adds the Recipient to it and returns the delivery.
        /// It has to check if the api response gives us the recipient,
        /// if it does, we add it to the delivery, if not we return the delivery unchanged
        /// </summary>
        /// <param name="delivery">Delivery Entity</param>
        /// <param name="data">api response in json format</param>
        /// <returns>Delivery with Recipient added to it</returns>
        private Delivery AddRecipient(Delivery delivery, JToken data)
        {
            var conf = _config.GetSection("Recipient").Value.ToString();
            if (conf == "")
            {
                return delivery;
            }
            if (conf.Contains('['))
            {
                delivery.Recipient = HandleBrackets(conf, data);
                return delivery;
            }
            delivery.Recipient = data.SelectToken($".{conf}").ToString();
            return delivery;
        }
        /// <summary>
        /// takes in the delivery that was created in the AddDelivery method
        /// adds the ID to it and returns the delivery.
        /// It has to check if the api response gives us the ID,
        /// if it does, we add it to the delivery, if not we return the delivery unchanged
        /// </summary>
        /// <param name="delivery">Delivery Entity</param>
        /// <param name="data">api response in json format</param>
        /// <returns>Delivery with ID added to it</returns>
        private Delivery AddID(Delivery delivery, JToken data)
        {
            var conf = _config.GetSection("ID").Value.ToString();
            if (conf == "")
            {
                return delivery;
            }
            if (conf.Contains('['))
            {
                delivery.ID = HandleBrackets(conf, data);
                return delivery;
            }
            delivery.ID = data.SelectToken($".{conf}").ToString();
            return delivery;
        }
        /// <summary>
        /// takes in the delivery that was created in the AddDelivery method
        /// adds the Seller to it and returns the delivery.
        /// It has to check if the api response gives us the Seller,
        /// if it does, we add it to the delivery, if not we return the delivery unchanged
        /// </summary>
        /// <param name="delivery">Delivery Entity</param>
        /// <param name="data">api response in json format</param>
        /// <returns>Delivery with Seller added to it</returns>
        private Delivery AddSeller(Delivery delivery, JToken data)
        {
            var conf = _config.GetSection("Seller").Value.ToString();
            if (conf == "")
            {
                return delivery;
            }
            if (conf.Contains('['))
            {
                delivery.Seller = HandleBrackets(conf, data);
                return delivery;
            }
            delivery.Seller = data.SelectToken($".{conf}").ToString();
            return delivery;
        }
        /// <summary>
        /// takes in the delivery that was created in the AddDelivery method
        /// adds the Driver Comment to it and returns the delivery.
        /// It has to check if the api response gives us the Driver Comment,
        /// if it does, we add it to the delivery, if not we return the delivery unchanged
        /// </summary>
        /// <param name="delivery">Delivery Entity</param>
        /// <param name="data">api response in json format</param>
        /// <returns>Delivery with Driver Comment added to it</returns>
        private Delivery AddDriverComment(Delivery delivery, JToken data)
        {
            var conf = _config.GetSection("DriverComment").Value.ToString();
            if (conf == "")
            {
                return delivery;
            }
            if (conf.Contains('['))
            {
                delivery.DriverComment = HandleBrackets(conf, data);
                return delivery;
            }
            delivery.DriverComment = data.SelectToken($".{conf}").ToString();
            return delivery;
        }
        /// <summary>
        /// takes in the delivery that was created in the AddDelivery method
        /// adds the Customer Comment to it and returns the delivery.
        /// It has to check if the api response gives us the Customer Comment,
        /// if it does, we add it to the delivery, if not we return the delivery unchanged
        /// </summary>
        /// <param name="delivery">Delivery Entity</param>
        /// <param name="data">api response in json format</param>
        /// <returns>Delivery with Customer Comment added to it</returns>
        private Delivery AddCustomerComment(Delivery delivery, JToken data)
        {
            var conf = _config.GetSection("CustomerComment").Value.ToString();
            if (conf == "")
            {
                return delivery;
            }
            if (conf.Contains('['))
            {
                delivery.CustomerComment = HandleBrackets(conf, data);
                return delivery;
            }
            delivery.CustomerComment = data.SelectToken($".{conf}").ToString();
            return delivery;
        }
        /// <summary>
        /// takes in the delivery that was created in the AddDelivery method
        /// adds the Status to it and returns the delivery.
        /// It has to check if the api response gives us the Status,
        /// if it does, we add it to the delivery, if not we return the delivery unchanged
        /// </summary>
        /// <param name="delivery">Delivery Entity</param>
        /// <param name="data">api response in json format</param>
        /// <returns>Delivery with Status added to it</returns>
        private Delivery AddStatus(Delivery delivery, JToken data)
        {
            var conf = _config.GetSection("Status").Value.ToString();
            if (conf == "")
            {
                return delivery;
            }
            delivery.Status = Int32.Parse(_config.GetSection("Status").Value.ToString());
            return delivery;
        }
        /// <summary>
        /// Finds the subsection of the address [City, Countr, HouseNumber, StreetName, ZipCode]
        /// and returns the correct data from the api response.
        /// </summary>
        /// <param name="data">api response data in json format</param>
        /// <param name="AddressType">The address type [PickupAddress, DeliveryAddress]</param>
        /// <param name="subsection">The subsection [City, Countr, HouseNumber, StreetName, ZipCode] </param>
        /// <returns>The relevant data from the api resonse in string format</returns>
        private String GetAddressSubsection(JToken data, String AddressType, String subsection)
        {
            var conf = _config.GetSection(AddressType).GetSection(subsection).Value;
            if (conf == "" || conf == null)
            {
                return null;
            }
            if (conf.Contains('['))
            {
                return HandleBrackets(conf, data);
            }
            return data.SelectToken($".{conf}").ToString();
        }
        /// <summary>
        /// Checks if the api repsonse has some sort of Pickup address we can get, by checking
        /// the config file. if it does not it return sthe Delivery entity object as it was.
        /// since it is a address we have to add it to our database using dbcontext.
        /// </summary>
        /// <param name="delivery">Delivery Entity</param>
        /// <param name="data">api response in json format</param>
        /// <returns>Delivery with PickupAddress added to it</returns>
        private Delivery AddPickupAddress(Delivery delivery, JToken data)
        {
            if (_config.GetSection("DeliveryAddress").Value == "") { return delivery; }
            var pickupAddress = new Address();
            pickupAddress.City = GetAddressSubsection(data, "PickupAddress", "City");
            pickupAddress.Country = GetAddressSubsection(data, "PickupAddress", "Country");
            pickupAddress.HouseNumber = GetAddressSubsection(data, "PickupAddress", "HouseNumber");
            pickupAddress.StreetName = GetAddressSubsection(data, "PickupAddress", "StreetName");
            pickupAddress.ZipCode = GetAddressSubsection(data, "PickupAddress", "ZipCode");
            _dbContext.Addresses.Add(pickupAddress);
            delivery.PickupAddress = pickupAddress;
            return delivery;
        }
        /// <summary>
        /// Checks if the api repsonse has some sort of Delivery address we can get, by checking
        /// the config file. if it does not it return sthe Delivery entity object as it was.
        /// since it is a address we have to add it to our database using dbcontext.
        /// </summary>
        /// <param name="delivery">Delivery Entity</param>
        /// <param name="data">api response in json format</param>
        /// <returns>Delivery with DeliveryAddress added to it</returns>
        private Delivery AddDeliveryAddress(Delivery delivery, JToken data)
        {
            if (_config.GetSection("DeliveryAddress").Value == "") { return delivery; }
            var deliveryAddress = new Address();
            deliveryAddress.City = GetAddressSubsection(data, "DeliveryAddress", "City");
            deliveryAddress.Country = GetAddressSubsection(data, "DeliveryAddress", "Country");
            deliveryAddress.HouseNumber = GetAddressSubsection(data, "DeliveryAddress", "HouseNumber");
            deliveryAddress.StreetName = GetAddressSubsection(data, "DeliveryAddress", "StreetName");
            deliveryAddress.ZipCode = GetAddressSubsection(data, "DeliveryAddress", "ZipCode");
            _dbContext.Addresses.Add(deliveryAddress);
            delivery.DeliveryAddress = deliveryAddress;
            return delivery;
        }
        /// <summary>
        /// This is not implemented yet, but it should do similar to every other method here
        /// it should check if the api has some sort of vehicle for us from the config file, 
        /// then it should get that vehicle from the api response, add it to the delivery, 
        /// and add it to the dbcontext, then return the new delivery.
        /// </summary>
        /// <param name="delivery">Delivery Entity</param>
        /// <param name="data">api response in json format</param>
        /// <returns>Delivery with Vehicle added to it</returns>
        // TODO implement this
        private Delivery AddVehicle(Delivery delivery, JToken data)
        {
            if (_config.GetSection("Vehicle").ToString() == "")
            {
                return delivery;
            }
            return delivery;
        }
        /// <summary>
        ///  finds the driver name or email in the api response, doesn't matter which one.
        /// then checks if it finds a driver with that email, if not it checks if has its drivers name
        /// then adds that driver to the delivery
        /// </summary>
        /// <param name="delivery">Delivery Entity</param>
        /// <param name="data">api response in json format</param>
        /// <returns>Delivery with Driver added to it</returns>
        private Delivery AddDriver(Delivery delivery, JToken data)
        {
            var conf = _config.GetSection("Driver").Value;
            if (conf == "")
            {
                return delivery;
            }
            var attribute = data.SelectToken($".{conf}").ToString();
            if (conf.Contains('['))
            {
                attribute = HandleBrackets(conf, data);
            }
            // Looks for the driver by name or email in the database
            var driver = _dbContext.Users.FirstOrDefault(u => u.Email == attribute);
            if (driver == null)
            {
                driver = _dbContext.Users.FirstOrDefault(u => u.Name == attribute);
            }
            // if it's still null here that means that the driver doesn not exist in our system.
            // for now I'm just returning the delivery, since this is automated.
            // so for now the delivery will just not have a driver if they type in the wrong information
            if (driver == null)
            {
                return delivery;
            }
            delivery.Driver = driver;
            return delivery;
        }
        /// <summary>
        /// Finds the packages in the api response, and adds them to the database
        /// as of now the dimensions are not stored, but it should not be hard to
        /// implement, as it should be similar to what we do above
        /// </summary>
        /// <param name="delivery">Delivery Entity</param>
        /// <param name="data">api response in json format</param>
        private void AddPackages(Delivery delivery, JToken data)
        {
            var conf = _config.GetSection("Packages");
            if (conf.GetSection("Name").Value == null) { return; }
            // get the array 
            var arr = data.SelectToken($".{conf.GetSection("Name").Value}");
            // looping through packages, from the external api and create those packages
            foreach (var item in arr)
            {
                // TODO Add dimensions and weight
                var entity = new Package
                {
                    ID = item.SelectToken($".{conf.GetSection("ID").Value}").ToString(),
                    Weight = 0.0,
                    Length = 0.0,
                    Height = 0.0,
                    Width = 0.0,
                    Delivery = delivery
                };
                _dbContext.Packages.Add(entity);
            }
        }
        /// <summary>
        /// Takes in api respose on the Json format, and extracts data 
        /// from it to create a new delivery in our database.
        /// </summary>
        /// <param name="delivery">api response on json format</param>
        public void AddDelivery(JToken delivery)
        {
            var entity = new Delivery();
            entity = AddID(entity, delivery);
            entity = AddCustomerComment(entity, delivery);
            entity = AddDeliveryAddress(entity, delivery);
            entity = AddDriver(entity, delivery);
            entity = AddDriverComment(entity, delivery);
            entity = AddPickupAddress(entity, delivery);
            entity = AddRecipient(entity, delivery);
            entity = AddSeller(entity, delivery);
            entity = AddStatus(entity, delivery);
            entity = AddVehicle(entity, delivery);
            _dbContext.Deliveries.Add(entity);
            AddPackages(entity, delivery);
            _dbContext.SaveChangesAsync();
        }
    }
}