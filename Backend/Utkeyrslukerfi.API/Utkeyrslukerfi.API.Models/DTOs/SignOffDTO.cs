using System;

namespace Utkeyrslukerfi.API.Models.Dtos
{
    public class SignOffDTO
    {
        public Guid ID { get; set; }
        public string ImageURI { get; set; }
        public string SignatureUri { get; set; }
        public string Recipient { get; set; }
    }
}