using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Utkeyrslukerfi.API.Models.Entities
{
    public class Signoff
    {
        public Guid ID { get; set; }
        public string ImageURI { get; set; }
        public string SignatureURI { get; set; }
        public string Recipient { get; set; }
        /// <summary>
        ///  ------------------------------------------------
        // | Sign Name| Take a picture | Take name | the integer value
        // ------------------------------------------------
        // | 0        | 0              | 1         | 1
        // ------------------------------------------------
        // | 0        | 1              | 0         | 2
        // ------------------------------------------------
        // | 0        | 1              | 1         | 3
        // ------------------------------------------------
        // | 1        | 0              | 0         | 4
        // ------------------------------------------------
        // | 1        | 0              | 1         | 5
        // ------------------------------------------------
        // | 1        | 1              | 0         | 6
        // ------------------------------------------------
        // | 1        | 1              | 1         | 7
        // ------------------------------------------------
        /// </summary>
        /// <value></value>
        public int? Settings { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedOn { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime LastUpdated { get; set; }

        // Navigation Property
        [ForeignKey("Delivery")]
        public string DeliveryID { get; set; }
        public Delivery Delivery { get; set; }
    }
}