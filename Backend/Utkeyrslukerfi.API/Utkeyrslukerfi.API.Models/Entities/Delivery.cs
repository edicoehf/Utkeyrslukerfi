using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace Utkeyrslukerfi.API.Models.Entities
{
    public class Delivery
    {
        // TODO check if ID should be something other than string
        public string ID { get; set; }
        public string Recipient { get; set; }
        public string Seller { get; set; }
        public string DriverComment { get; set; }
        public string CustomerComment { get; set; }
        public int Status { get; set; }
        [ForeignKey("Address")]
        public Guid PickupAddressID { get; set; }
        public Address PickupAddress { get; set; }
        [ForeignKey("Address")]
        public Guid DeliveryAddressID { get; set; }
        public Address DeliveryAddress { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedOn { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime LastUpdated { get; set; }
        public DateTime DeliveryDate { get; set; }

        // Navigation Properties
        public Vehicle Vehicle { get; set; }
        public User Driver { get; set; }
        public List<Package> Packages { get; set; }
        public Signoff Signoff { get; set; }
    }
}