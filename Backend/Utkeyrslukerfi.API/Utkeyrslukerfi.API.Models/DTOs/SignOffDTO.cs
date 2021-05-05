using System;

namespace Utkeyrslukerfi.API.Models.Dtos
{
    public class SignoffDTO
    {
        public Guid ID { get; set; }
        public string ImageURI { get; set; }
        public string SignatureUri { get; set; }
        public string Recipient { get; set; }
    }
}