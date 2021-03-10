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
    [Route("api/users")]
    public class AccountController : ControllerBase
    {

        private readonly ILogger<AccountController> _logger;
        private readonly IUserService _userService;

        public AccountController(ILogger<AccountController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }
        /// <summary>
        /// Athenticates users by credentials
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET api/account
        ///     {
        ///       "Email": "Mikaeelmani99@gmail.com",
        ///       "Password": 12345
        ///     }
        ///
        /// </remarks>
        /// <returns>A user with the given ID</returns>
        /// <response code="200">Logs in the user with the given credentials</response>
        /// <response code="401">The Auth token was invalid </response>
        /// <response code="404">There is no user with the given ID</response> 

        [HttpPost]
        [Route("signin")]
        public IActionResult SignInUser([FromBody] LoginInputModel login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("User creadentials are invalid!");
            }
            // TODO: authenticate user
            return NoContent();
        }

        [HttpGet]
        [Route("signout")]
        public IActionResult SignOutUser()
        {
            // TODO: implement
            return NoContent();
        }
    }
}

