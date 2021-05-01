using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Utkeyrslukerfi.API.Models.Entities;

namespace Utkeyrslukerfi.API.Repositories.IContext
{
    public interface IUtkeyrslukerfiDbContext
    {
        DbSet<User> Users { get; set; }
        DbSet<JwtToken> JwtTokens { get; set; }
        DbSet<Address> Addresses { get; set; }
        DbSet<Signoff> Signoffs { get; set; }
        DbSet<Vehicle> Vehicles { get; set; }
        DbSet<Delivery> Deliveries { get; set; }
        DbSet<Package> Packages { get; set; }
        int SaveChanges();
        Task<int> SaveChangesAsync();
    }
}