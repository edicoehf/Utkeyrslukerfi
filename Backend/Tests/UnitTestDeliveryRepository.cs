using System;
using Xunit;
using Utkeyrslukerfi.API.Models.InputModels;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Repositories.Implementations;
using Utkeyrslukerfi.API.Models.Exceptions;
using AutoMapper;
using Utkeyrslukerfi.API;
using Utkeyrslukerfi.API.Repositories.Context;
using Utkeyrslukerfi.API.Repositories.IContext;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Tests
{
    public class UnitTestDeliveryRepository
    {
        private readonly IUtkeyrslukerfiDbContext _dbContext;
        private readonly DeliveryRepository _delivRepo;

        public UnitTestDeliveryRepository()
        {
            _dbContext = GetContext();
            _delivRepo = GetDeliveryRepository(_dbContext);
        }
        private static UtkeyrslukerfiDbContext GetContext()
        {
            var options = new DbContextOptionsBuilder<UtkeyrslukerfiDbContext>()
                                  .UseInMemoryDatabase("Utkeyrslukerfi")
                                  .Options;
            var dbContext = new UtkeyrslukerfiDbContext(options);
            return dbContext;
        }

        private static DeliveryRepository GetDeliveryRepository(IUtkeyrslukerfiDbContext dbContext)
        {
            // Generating Mapper annd dbcontext, as it's needed in the Repository class
            var mapperConfig = new MapperConfiguration(mc => { mc.AddProfile(new MappingProfile()); });
            var mapper = mapperConfig.CreateMapper();

            // Creating the Address Repository and Delivery Repository
            var addressRepo = new AddressRepository(mapper, dbContext);
            var delRepo = new DeliveryRepository(mapper, dbContext, addressRepo);
            return delRepo;
        }

        private static Delivery GetDelivery(IUtkeyrslukerfiDbContext dbContext, string deliveryID)
        {

            // start by adding a valid Delivery
            var pickup = new Address()
            {
                ID = Guid.NewGuid(),
                StreetName = "Nestún",
                HouseNumber = "9a",
                ZipCode = "340",
                City = "Stykkishólmur",
                Country = "Ísland"
            };
            var deliv = new Address()
            {
                ID = Guid.NewGuid(),
                StreetName = "Hólar",
                HouseNumber = "92",
                ZipCode = "322",
                City = "Ólafsvík",
                Country = "Ísland"
            };
            var vehicle = new Vehicle()
            {
                ID = Guid.NewGuid(),
                LicensePlate = "R91"
            };
            var driver = new User()
            {
                ID = Guid.NewGuid(),
                Name = "Kolbeinn Blandon",
                Email = "kolbeinnhardi@gmail.com",
                Role = 3
            };

            var delivery = new Delivery()
            {
                ID = deliveryID,
                Recipient = "Mikael Máni Jónsson",
                Seller = "Core ehf.",
                DriverComment = "Original driver comment",
                CustomerComment = "Original customer comment",
                Status = 3,
                PickupAddress = pickup,
                DeliveryAddress = deliv,
                DeliveryDate = DateTime.UtcNow,
                Vehicle = vehicle,
                Driver = driver
            };
            dbContext.Addresses.Add(pickup);
            dbContext.Addresses.Add(deliv);
            dbContext.Vehicles.Add(vehicle);
            dbContext.Users.Add(driver);
            return delivery;
        }

        // Test for create delivery, function not needed
        // [Theory]
        // [ClassData(typeof(DeliveryDataValid))]
        public void ShouldBeValid_CreateDelivery(DeliveryInputModel data)
        {
            var driver = new User()
            {
                ID = Guid.NewGuid(),
                Name = "Kalli Halli",
                Email = "Kalli@halli.is",
                Role = 3
            };
            _dbContext.Users.Add(driver);

            // adding the vehicle to the database
            var vehicle = new Vehicle()
            {
                ID = Guid.NewGuid(),
                LicensePlate = "YU354"
            };
            _dbContext.Vehicles.Add(vehicle);
            _dbContext.SaveChanges();

            var deliv = _delivRepo.CreateDelivery(data);
            // Checking the simple datatypes
            Assert.Equal(data.ID, deliv.ID);
            Assert.Equal(data.CustomerComment, deliv.CustomerComment);
            Assert.Equal(data.DriverComment, deliv.DriverComment);
            Assert.Equal(data.Status, deliv.Status);
            Assert.Equal(data.Seller, deliv.Seller);
            Assert.Equal(data.Recipient, deliv.Recipient);
            // Checking PickupAddress
            Assert.IsType<Guid>(deliv.PickupAddress.ID);
            Assert.Equal(data.PickupAddressCity, deliv.PickupAddress.City);
            Assert.Equal(data.PickupAddressCountry, deliv.PickupAddress.Country);
            Assert.Equal(data.PickupAddressHouseNumber, deliv.PickupAddress.HouseNumber);
            Assert.Equal(data.PickupAddressStreetName, deliv.PickupAddress.StreetName);
            Assert.Equal(data.PickupAddressZipCode, deliv.PickupAddress.ZipCode);
            // Checking DeliveryAddress
            Assert.IsType<Guid>(deliv.PickupAddress.ID);
            Assert.Equal(data.DeliveryAddressCity, deliv.DeliveryAddress.City);
            Assert.Equal(data.DeliveryAddressCountry, deliv.DeliveryAddress.Country);
            Assert.Equal(data.DeliveryAddressHouseNumber, deliv.DeliveryAddress.HouseNumber);
            Assert.Equal(data.DeliveryAddressStreetName, deliv.DeliveryAddress.StreetName);
            Assert.Equal(data.DeliveryAddressZipCode, deliv.DeliveryAddress.ZipCode);
        }

        // Test for create delivery, function not needed
        // [Theory]
        // [ClassData(typeof(DeliveryDataInValid))]
        public void ShouldBeInvalid_CreateDelivery(DeliveryInputModel data)
        {
            // neither the driver nor the Vehicle exists
            Assert.Throws<NotFoundException>(() => _delivRepo.CreateDelivery(data));
            // adding the driver to the db
            var driver = new User()
            {
                ID = Guid.NewGuid(),
                Name = "Kalli Halli",
                Email = "Kalli@halli.is",
                Role = 3
            };
            Assert.Throws<NotFoundException>(() => _delivRepo.CreateDelivery(data));
        }
        /// <summary>
        /// This is not a test that tests update fully
        /// It does not test if update on Vehicle, Driver, PickupAddress, DeliveryAddress
        /// </summary>
        [Theory]
        [ClassData(typeof(DeliveryUpdateDataValid))]
        public void ShouldBeValid_UpdateDelivery(DeliveryInputModel data)
        {
            var deliveryID = "7340131602103";

            var delivery = GetDelivery(_dbContext, deliveryID);

            _dbContext.Deliveries.Add(delivery);

            _dbContext.SaveChanges();
            // gets a copy of the delivery
            var unUpdatedDeliv = _dbContext.Deliveries.AsNoTracking().FirstOrDefault(d => d.ID == deliveryID);

            // Update the valid delivery
            _delivRepo.UpdateDelivery(data, deliveryID);

            if (data.CustomerComment != null) { Assert.NotEqual(unUpdatedDeliv.CustomerComment, delivery.CustomerComment); }
            if (data.DriverComment != null) { Assert.NotEqual(unUpdatedDeliv.DriverComment, delivery.DriverComment); }
            if (data.Recipient != null) { Assert.NotEqual(unUpdatedDeliv.Recipient, delivery.Recipient); }
            if (data.Seller != null) { Assert.NotEqual(unUpdatedDeliv.Seller, delivery.Seller); }
            if (data.CustomerComment != null) { Assert.NotEqual(unUpdatedDeliv.CustomerComment, delivery.CustomerComment); }

            // removing the delivery from the database
            _dbContext.Deliveries.Remove(delivery);
            _dbContext.Deliveries.Remove(unUpdatedDeliv);
            _dbContext.SaveChanges();
        }

        [Fact]
        public void ShouldBeInvalid_UpdateDelivery()
        {
            Assert.Throws<NotFoundException>(() => _delivRepo.UpdateDelivery(new DeliveryInputModel(), "Not a Valid ID"));
        }

    }
    public class DeliveryDataValid : TheoryData<DeliveryInputModel>
    {
        public DeliveryDataValid()
        {
            Add(new DeliveryInputModel
            {
                ID = "7340131602104",
                Recipient = "Mikael Máni Jónssonn",
                Seller = "Core ehf",
                DriverComment = "Allt of mikið af Limón Nocco",
                CustomerComment = "null",
                Status = 1,
                PickupAddressCity = "Kópavogur",
                PickupAddressHouseNumber = "null",
                PickupAddressZipCode = "203",
                PickupAddressCountry = "null",
                DeliveryAddressCity = "Kópavogur",
                DeliveryAddressHouseNumber = "null",
                DeliveryAddressZipCode = "203",
                DeliveryAddressCountry = "null"
            });
        }
    }

    public class DeliveryDataInValid : TheoryData<DeliveryInputModel>
    {
        public DeliveryDataInValid()
        {
            Add(new DeliveryInputModel
            {
                ID = null,
                Recipient = "Mikael Máni Jónssonn",
                Seller = "Core ehf",
                DriverComment = "Allt of mikið af Limón Nocco",
                CustomerComment = null,
                Status = 1,
                PickupAddressCity = "Kópavogur",
                PickupAddressHouseNumber = null,
                PickupAddressZipCode = "203",
                PickupAddressCountry = null,
                DeliveryAddressCity = "Kópavogur",
                DeliveryAddressHouseNumber = null,
                DeliveryAddressZipCode = "203",
                DeliveryAddressCountry = null
            });
        }
    }

    public class DeliveryUpdateDataValid : TheoryData<DeliveryInputModel>
    {
        public DeliveryUpdateDataValid()
        {
            Add(new DeliveryInputModel { Recipient = "Mikki" });
            Add(new DeliveryInputModel { Seller = "Someone" });
            Add(new DeliveryInputModel { DriverComment = "Uppfært Driver comment" });
            Add(new DeliveryInputModel { CustomerComment = "Uppfært Customer comment" });
            Add(new DeliveryInputModel { Status = 2 });
            Add(new DeliveryInputModel { PickupAddressCity = "Kóp" });
            Add(new DeliveryInputModel { PickupAddressCountry = "Danmörk" });
            Add(new DeliveryInputModel { PickupAddressHouseNumber = "32" });
            Add(new DeliveryInputModel { PickupAddressStreetName = "Ling" });
            Add(new DeliveryInputModel { PickupAddressZipCode = "111" });
            Add(new DeliveryInputModel { DeliveryAddressCity = "Reyk" });
            Add(new DeliveryInputModel { DeliveryAddressCountry = "Svíþjóð" });
            Add(new DeliveryInputModel { DeliveryAddressHouseNumber = "322" });
            Add(new DeliveryInputModel { DeliveryAddressStreetName = "Berg" });
            Add(new DeliveryInputModel { DeliveryAddressZipCode = "340" });
        }
    }

    public class DeliveryUpdateDataInValid : TheoryData<DeliveryInputModel>
    {
        public DeliveryUpdateDataInValid()
        {
            Add(new DeliveryInputModel { Status = 1337 });
        }
    }
}
