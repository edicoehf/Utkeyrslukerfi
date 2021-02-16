using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Utkeyrslukerfi.API.Controllers
{
    [ApiController]
    [Route("[Delivery]")]
    public class DeliveryController : ControllerBase
    {

        private readonly ILogger<DeliveryController> _logger;

        public DeliveryController(ILogger<DeliveryController> logger)
        {
            _logger = logger;
        }

        // get deliveries
        // get delivery
        // update delivery
        // create delivery
    }
}
