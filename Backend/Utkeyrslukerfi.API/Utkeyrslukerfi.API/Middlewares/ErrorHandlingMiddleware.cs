using System;
using System.Net;
using System.Threading.Tasks;
using Utkeyrslukerfi.API.Models.Exceptions;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace Utkeyrslukerfi.API.Middlewares
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }
        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            HttpStatusCode status;
            string message;
            var stackTrace = exception.StackTrace;
            var exceptionType = exception.GetType();
            if (exceptionType == typeof(NotFoundException))
            {
                message = exception.Message;
                status = HttpStatusCode.NotFound;
            }
            else if (exceptionType == typeof(InvalidLoginException))
            {
                message = exception.Message;
                status = HttpStatusCode.Unauthorized;
            }
            else if (exceptionType == typeof(EmailAlreadyExistsException))
            {
                message = exception.Message;
                status = HttpStatusCode.BadRequest;
            }
            else
            {
                status = HttpStatusCode.InternalServerError;
                message = "🤡 Oopsie the server fucked up 🤡";
            }
            var result = JsonConvert.SerializeObject(new { errors = new { Message = new string[] { message } }, stacktrace = stackTrace });
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)status;
            return context.Response.WriteAsync(result.ToString());
        }
    }
}