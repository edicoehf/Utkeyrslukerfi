using System.ComponentModel.DataAnnotations.Schema;

namespace Utkeyrslukerfi.API.Models.Entities
{
    public class Signoff
    {
        public int ID { get; set; }
        public string ImageURI { get; set; }
        public string SignatureUri { get; set; }
        public string Recipient { get; set; }

        // Navigation Property
        [ForeignKey("Delivery")]
        public string DeliveryID { get; set; }
        public Delivery Delivery { get; set; }
    }
}