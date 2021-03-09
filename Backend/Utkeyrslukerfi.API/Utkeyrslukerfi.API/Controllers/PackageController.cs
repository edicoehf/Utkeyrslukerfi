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
    [Route("api/packages")]
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
        [Route("{id:int}")]
        public IActionResult GetPackage(string id)
        {
            return NoContent();
        }

        [HttpGet]
        public IActionResult GetPackages()
        {
            var packages = _packageService.GetPackages();
            return Ok(packages);
        }

        [HttpPost]
        [Route("", Name = "CreatePackage")]
        public IActionResult CreatePackage([FromBody] PackageInputModel package)
        {
            if (!ModelState.IsValid)
            {
                throw new Exception("Error in CreatePackage controller");
            }
            var new_package = _packageService.CreatePackage(package);
            return CreatedAtRoute("CreatePackage", new_package, null);
        }
    }
}
