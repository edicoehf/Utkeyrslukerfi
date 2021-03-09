using System;

namespace Utkeyrslukerfi.API.Models.Exceptions {
    public class NotFoundException : Exception{
        public NotFoundException(string message) : base(message)
        { }
    }
}