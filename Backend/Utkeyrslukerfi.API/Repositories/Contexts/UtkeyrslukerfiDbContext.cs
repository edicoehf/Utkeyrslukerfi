using Utkeyrslukerfi.API.Models.Entities;
using Microsoft.EntityFrameworkCore; 

namespace Utkeyrslukerfi.API.Repositories.Context {
    public class UtkeyrslukerfiDbContext: DbContext {
        public UtkeyrslukerfiDbContext(DbContextOptions<UtkeyrslukerfiDbContext> options) : base(options){}

        protected override void OnModelCreating(ModelBuilder modelBuilder){

            // modelBuilder.Entity<Package>()
            //     .HasOne(m => m.Delivery);

            // // TODO find out if we have to do something special since Vehicle is nullable
            // modelBuilder.Entity<Delivery>()
            //     .HasOne(m => m.Signoff)
            //     .HasOne(m => m.Vehicle)
            //     .HasTwo(m => m.Address);
            
            // modelBuilder.Entity<Vehicle>()
            //     .HasOne(m => m.ShoppingCart);
            
            // modelBuilder.Entity<Delivery>()
            //     .HasOne(m => m.User)
            //     .WithMany(u => u.Addresses);
        
            // modelBuilder.Entity<Package>()
            //     .HasOne(m => m.User)
            //     .WithOne(u => u.ShoppingCart);
    
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Signoff> Signoffs { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Delivery> Deliveries { get; set; }
        public DbSet<Package> Packages { get; set; }
        
    }
}