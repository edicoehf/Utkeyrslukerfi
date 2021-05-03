using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Services.Interfaces;

namespace Utkeyrslukerfi.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/vehicles")]
    public class VehicleController : ControllerBase
    {

        private readonly ILogger<VehicleController> _logger;
        private readonly IVehicleService _vehicleService;

        public VehicleController(ILogger<VehicleController> logger, IVehicleService vehicleService)
        {
            _logger = logger;
            _vehicleService = vehicleService;
        }
        /// <summary>
        /// Returns a specific Vehicle by Number Plate
        /// </summary>
        /// <param name="id">ID</param>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET api/vehicles/OUI30
        ///        {
        ///        "id": 1,
        ///        "licensePlate": "OUI30",
        ///        "length": 3.45,
        ///        "height": 1.89,
        ///        "width": 1.05
        ///        }
        ///
        /// </remarks>
        /// <returns>An Vehicle with the given ID</returns>
        /// <response code="200">Returns the Vehicle with the given ID</response>
        /// <response code="401">The Auth token was invalid </response>
        /// <response code="404">There is no Vehicle with the given ID</response> 
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetVehicle(string id)
        {
            var vehicle = _vehicleService.GetVehicle(id);
            return Ok(vehicle);
        }

        /// <summary>
        /// Returns the list of all vehicles
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET api/vehicles
        ///
        /// </remarks>
        /// <returns> The list of all Vehicles</returns>
        /// <response code="200">Returns the list of all Vehicles</response>
        /// <response code="400">Bad Request</response>
        /// <response code="401">The Auth token was invalid</response>
        /// <response code="404">There is a server error</response> 

        [HttpGet]
        [Route("", Name = "GetVehicles")]
        public IActionResult GetVehicles([FromQuery] int pageSize = 25, int pageNumber = 0)
        {
            var vehicles = _vehicleService.GetVehicles(pageSize, pageNumber);
            return Ok(vehicles);
        }
        [Authorize(Roles = "1")]
        [Authorize(Roles = "2")]
        [HttpPatch]
        [Route("{id}", Name = "UpdateVehicle")]
        public IActionResult UpdateVehicle([FromBody] VehicleInputModel vehicle, string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Model is not valid!");
            }
            _vehicleService.UpdateVehicle(vehicle, id);
            return NoContent();
        }
        [Authorize(Roles = "1")]
        [Authorize(Roles = "2")]
        [HttpPost]
        [Route("", Name = "CreateVehicle")]
        public IActionResult CreateVehicle([FromBody] VehicleInputModel vehicle)
        {
            if (!ModelState.IsValid)
            {
                throw new Exception("Error in CreateVehicle controller");
            }
            var newVehicle = _vehicleService.CreateVehicle(vehicle);
            return CreatedAtRoute("CreateVehicle", newVehicle);
        }
    }
}
