using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
        /// <param name="id">ID</param>
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
        public IActionResult GetAddress(int id)
        {
            var address = _addressService.GetAddress(id);
            return Ok(address);
        }
    }
}
