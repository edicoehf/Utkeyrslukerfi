namespace Utkeyrslukerfi.API.Models.Entities {
    public class Delivery {
        // TODO check if ID should be something other than string
        public string ID { get; set; }
        public string Recipient { get; set; }
        public string Seller { get; set; }
        public Vehicle Vehicle { get; set; }
        public Address PickupAddress { get; set; }
        public Address DeliverAddress { get; set; }
        public User Driver { get; set; }
        public int Status { get; set; }
        public Signoff Signoff { get; set; }
    }
}