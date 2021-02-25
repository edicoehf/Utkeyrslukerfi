using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Services.Interfaces;

namespace Utkeyrslukerfi.API.Controllers
{
    [ApiController]
    [Route("api/deliveries")]
    public class DeliveryController : ControllerBase
    {

        private readonly ILogger<DeliveryController> _logger;
        private readonly IDeliveryService _deliveryService;

        public DeliveryController(ILogger<DeliveryController> logger, IDeliveryService deliveryService)
        {
            _logger = logger;
            _deliveryService = deliveryService;
        }
        /// <summary>
        /// Returns a specific delivery by ID/Barcode
        /// </summary>
        /// <param name="ID">ID/Barcode</param>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET api/deliveries/1234567890128
        ///     {
        ///        "ID": "1234567890128",
        ///        "Recipient": "Item1",
        ///        "Seller": "Item1",
        ///        "Status": 2,
        ///        "Driver": {
        ///                     "ID": 123,
        ///                     "Name": "Mikael Máni Jónsson",
        ///                     "Email": "Mikaeelmani99@gmail.com",
        ///                     "Role": 3
        ///                   },
        ///        "PickupAddress": {
        ///                     "ID": 45,
        ///                     "StreetName": "Álfkonuhvarf",
        ///                     "HouseNumber": "19",
        ///                     "ZipCode": "203",
        ///                     "City": "Kópavogur",
        ///                     "Country": "Ísland"     
        ///                   },
        ///        "DeliverAddress": {
        ///                     "ID": 46,
        ///                     "StreetName": "Nestún",
        ///                     "HouseNumber": "9a",
        ///                     "ZipCode": "340",
        ///                     "City": "Stykkishólmur",
        ///                     "Country": "Ísland"     
        ///                   },
        ///        "Vehicle": {
        ///                     "ID": 12,
        ///                     "LicensePlate": "OUI30",
        ///                     "Length": 3.45,
        ///                     "Height": 1.89,
        ///                     "Width": 1.05
        ///                   },
        ///        "Packages": [
        ///                       {
        ///                           "ID": "1234567890129"
        ///                       },
        ///                       {
        ///                           "ID": "1234567890133"
        ///                       },
        ///                   ]
        ///     }
        ///
        /// </remarks>
        [HttpGet]
        [Route("{id}", Name="GetDeliveryByID")]
        public IActionResult GetDelivery(string ID){
            var delivery = _deliveryService.GetDelivery(ID);
            return Ok(delivery);
        }
        // get delivery
        // update delivery
        // create delivery
        [HttpPost]
        [Route("", Name="CreateDelivery")]
        public IActionResult CreateDelivery([FromBody] DeliveryInputModel delivery){
            if (!ModelState.IsValid){
                throw new Exception("Error in CreateDelivery controller");
            }
            var new_delivery = _deliveryService.CreateDelivery(delivery);
            return CreatedAtRoute("CreateDelivery", new_delivery, null);
        }
    }
}
