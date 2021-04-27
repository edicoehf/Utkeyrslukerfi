using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Services.Interfaces;

namespace Utkeyrslukerfi.API.Controllers
{
    [Authorize(Roles = "1")]
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {

        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }
        /// <summary>
        /// Returns a specific user by ID/Barcode
        /// </summary>
        /// <param name="id">ID</param>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET api/users/1
        ///     {
        ///       "ID": 1,
        ///       "Name": "Mikael Máni Jónsson",
        ///       "Email": "Mikaeelmani99@gmail.com",
        ///       "Role": 3
        ///     }
        ///
        /// </remarks>
        /// <returns>A user with the given ID</returns>
        /// <response code="200">Returns the user with the given ID</response>
        /// <response code="401">The Auth token was invalid </response>
        /// <response code="404">There is no user with the given ID</response> 
        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetUser(int id)
        {
            var user = _userService.GetUser(id);
            return Ok(user);
        }

        [HttpGet]
        [Route("by-email")]
        public IActionResult GetUserByEmail([FromQuery] string email = "")
        {
            if (email == "")
            {
                throw new Exception("Error in GetUserByEmail controller");
            }
            var user = _userService.GetUserByEmail(email);
            return Ok(user);
        }

        [HttpGet]
        public IActionResult GetUsers([FromQuery] int role = 0, int pageSize = 25, int pageNumber = 0)
        {
            var users = _userService.GetUsers(role, pageSize, pageNumber);
            return Ok(users);
        }

        [HttpPost]
        [Route("", Name = "CreateUser")]
        public IActionResult CreateUser([FromBody] UserInputModel user)
        {
            if (!ModelState.IsValid)
            {
                throw new Exception("Error in CreateUser controller");
            }
            var new_user = _userService.CreateUser(user);
            return CreatedAtRoute("CreateUser", new_user.ID, new_user);
        }

        [HttpPut]
        [Route("{id:int}", Name = "UpdateUser")]
        public IActionResult UpdateUser([FromBody] UserInputModel user, int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("User is not valid!");
            }
            _userService.UpdateUser(user, id);
            return NoContent();
        }
    }
}

