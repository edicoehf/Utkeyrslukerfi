using System;

namespace Utkeyrslukerfi.API.Models.Exceptions {
    public class InvalidLoginException : Exception{
        public InvalidLoginException(string message) : base(message)
        { }
    }
}