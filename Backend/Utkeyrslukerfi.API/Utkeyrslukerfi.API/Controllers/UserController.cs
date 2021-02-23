using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Utkeyrslukerfi.API.Models.InputModels;

namespace Utkeyrslukerfi.API.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {

        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult getUser(int id){
            return Ok(id);
        }

        [HttpGet]
        public IActionResult getUsers(){
            return NoContent();
        }

        [HttpPost]
        public IActionResult RegisterUser([FromBody] UserInputModel inputModel){
            return NoContent();
        }

        [HttpPut]
        public IActionResult UpdateUser([FromBody] UserInputModel inputModel){
            return NoContent();
        }
    }
}
