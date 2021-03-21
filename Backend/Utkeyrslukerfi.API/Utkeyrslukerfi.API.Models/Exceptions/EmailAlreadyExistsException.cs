using System;

namespace Utkeyrslukerfi.API.Models.Exceptions
{
    public class EmailAlreadyExistsException : Exception
    {
        public EmailAlreadyExistsException(string message) : base(message)
        { }
    }
}