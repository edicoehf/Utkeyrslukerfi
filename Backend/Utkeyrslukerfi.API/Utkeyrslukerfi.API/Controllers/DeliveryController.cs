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

        // get deliveries
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
