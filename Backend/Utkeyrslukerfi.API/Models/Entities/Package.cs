namespace Utkeyrslukerfi.API.Models.Entities {
    public class Package {
        public string ID { get; set; }
        public Delivery Delivery { get; set; }
        public double Weight { get; set; }
        public double Length { get; set; }
        public double Height { get; set; }
        public double Width { get; set; }
    }
}