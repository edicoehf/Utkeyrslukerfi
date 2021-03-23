using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Services.Interfaces;

namespace Utkeyrslukerfi.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/account")]
    public class AccountController : ControllerBase
    {

        private readonly ILogger<AccountController> _logger;
        private readonly IAccountService _accountService;
        private readonly ITokenService _tokenService;
        private readonly IUserService _userService;

        public AccountController(ILogger<AccountController> logger, IAccountService accountService, ITokenService tokenService, IUserService userService)
        {
            _logger = logger;
            _accountService = accountService;
            _tokenService = tokenService;
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

        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] LoginInputModel login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("User creadentials are invalid!");
            }
            var user = _accountService.Login(login);
            var token = _tokenService.GenerateJwtToken(user);

            return Ok(new LoginDto() { Token = token, ChangePassword = user.ChangePassword });

        }

        [HttpGet]
        [Route("logout")]
        public IActionResult Logout()
        {
            int.TryParse(User.Claims.FirstOrDefault(c => c.Type == "tokenID").Value, out var tokenID);
            _accountService.Logout(tokenID);
            return NoContent();
        }

        [HttpPatch]
        [Route("login")]
        public IActionResult Update([FromBody] PasswordInputModel password)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Password is not valid!");
            }
            int.TryParse(User.Claims.FirstOrDefault(c => c.Type == "tokenID").Value, out var tokenID);
            var userID = _accountService.GetUserID(tokenID);
            _userService.UpdatePassword(password, userID);
            return NoContent();
        }
    }
}

