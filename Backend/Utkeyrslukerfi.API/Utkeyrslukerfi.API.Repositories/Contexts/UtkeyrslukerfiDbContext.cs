using Utkeyrslukerfi.API.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using Utkeyrslukerfi.API.Repositories.Helpers;

namespace Utkeyrslukerfi.API.Repositories.Context
{
    public class UtkeyrslukerfiDbContext : DbContext
    {
        public UtkeyrslukerfiDbContext(DbContextOptions<UtkeyrslukerfiDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Mapping the one to one relationship between 
            // Delivery and Signoff
            modelBuilder.Entity<Signoff>()
                .HasOne(s => s.Delivery)
                .WithOne(d => d.Signoff)
                .HasForeignKey<Signoff>(s => s.DeliveryID);
            // Mapping the one to many relationship between 
            // Package and Delivery
            modelBuilder.Entity<Package>()
                .HasOne(p => p.Delivery)
                .WithMany(b => b.Packages);
            // Mapping the one to many relationship between
            // User and Delivery
            modelBuilder.Entity<Delivery>()
                .HasOne(d => d.Driver)
                .WithMany(u => u.Deliveries);
            // Mapping the one to many relationship between
            // Vehicle and Delivery
            modelBuilder.Entity<Delivery>()
                .HasOne(d => d.Vehicle)
                .WithMany(v => v.Deliveries);
            // Mapping the one to many relationship between
            // User and JwtToken
            modelBuilder.Entity<JwtToken>()
                .HasOne(t => t.User)
                .WithMany(u => u.JwtTokens);

            // TODO make this work
            // seeding admin user
            // var tempPass = HashingHelper.HashPassword("");
            // modelBuilder.Entity<User>()
            //     .HasData(
            //         new User(){
            //             Name = "Admin",
            //             Email = "admin@edico.is",
            //             Password = tempPass,
            //             Role = 1,
            //             ChangePassword = false,
            //             CreatedOn = DateTime.UtcNow,
            //             TokenID = 0,
            //         }
            //     );
        }

        public DbSet<User> Users { get; set; }
        public DbSet<JwtToken> JwtTokens { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Signoff> Signoffs { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Delivery> Deliveries { get; set; }
        public DbSet<Package> Packages { get; set; }

    }
}