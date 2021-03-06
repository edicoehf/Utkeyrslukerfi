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
    [Route("api/deliveries/{deliveryID}/packages")]
    public class PackageController : ControllerBase
    {
        private readonly ILogger<PackageController> _logger;
        private readonly IPackageService _packageService;

        public PackageController(ILogger<PackageController> logger, IPackageService packageService)
        {
            _logger = logger;
            _packageService = packageService;
        }
        /// <summary>
        /// Returns a specific package by ID/Barcode
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="deliveryID">deliveryID</param>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET api/packages/1
        ///     {
        ///       "ID": 1,
        ///       "Weight": 0.0,
        ///       "Length": 0.0,
        ///       "Height": 0.0,
        ///       "Width": 0.0
        ///     }
        ///
        /// </remarks>
        /// <returns>A package with the given ID</returns>
        /// <response code="200">Returns the package with the given ID</response>
        /// <response code="401">The Auth token was invalid </response>
        /// <response code="404">There is no package with the given ID</response> 
        [HttpGet]
        [Route("{id}", Name = "GetPackage")]
        public IActionResult GetPackage(string deliveryID, string id)
        {
            var package = _packageService.GetPackage(deliveryID, id);
            return Ok(package);
        }

        [HttpGet]
        public IActionResult GetPackages(string deliveryID, [FromQuery] int pageSize = 25, int pageNumber = 0)
        {
            var packages = _packageService.GetPackages(deliveryID, pageSize, pageNumber);
            return Ok(packages);
        }

        [Authorize(Roles = "1,2")]
        [HttpPost]
        [Route("", Name = "CreatePackage")]
        public IActionResult CreatePackage(string DeliveryID, [FromBody] PackageInputModel package)
        {
            if (!ModelState.IsValid)
            {
                throw new Exception("Error in CreatePackage controller");
            }
            var new_package = _packageService.CreatePackage(DeliveryID, package);
            return CreatedAtRoute("CreatePackage", new_package.ID, new_package);
        }
    }
}
