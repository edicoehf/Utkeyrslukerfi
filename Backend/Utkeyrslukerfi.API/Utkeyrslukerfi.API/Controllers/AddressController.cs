using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Utkeyrslukerfi.API.Models.InputModels;
using Microsoft.AspNetCore.Authorization;
using Utkeyrslukerfi.API.Services.Interfaces;

namespace Utkeyrslukerfi.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/address")]
    public class AddressController : ControllerBase
    {
        private readonly ILogger<AddressController> _logger;
        private readonly IAddressService _addressService;

        public AddressController(ILogger<AddressController> logger, IAddressService addressService)
        {
            _logger = logger;
            _addressService = addressService;
        }
        /// <summary>
        /// Returns a specific Address by ID
        /// </summary>
        /// <param name="ID">ID</param>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET api/address/1
        ///        {
        ///        "id": 1,
        ///        "streetName": "Álfkonuhvarf",
        ///        "houseNumber": "19",
        ///        "zipCode": "203",
        ///        "city": "Kópavogur",
        ///        "country": "Ísland"
        ///        }
        ///
        /// </remarks>
        /// <returns>An Address with the given ID</returns>
        /// <response code="200">Returns the Address with the given ID</response>
        /// <response code="401">The Auth token was invalid </response>
        /// <response code="404">There is no Address with the given ID</response> 
        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetAddress(Guid ID)
        {
            var address = _addressService.GetAddress(ID);
            return Ok(address);
        }
        /// <summary>
        /// Creates a new address
        /// </summary>
        /// <returns>A newly created Address</returns>
        /// <response code="200">Returns the newly created Address</response>
        /// <response code="401">The Auth token was invalid </response>
        /// <response code="404">Bad request!</response> 
        [HttpPost]
        [Route("", Name = "CreateAddress")]
        public IActionResult CreateAddress([FromBody] AddressInputModel address)
        {
            if (!ModelState.IsValid)
            {
                throw new Exception("Error in CreateAddress controller");
            }
            var new_address = _addressService.CreateAddress(address);
            return CreatedAtRoute("CreateAddress", new_address);
        }
    }
}
