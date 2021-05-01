using System;
using Xunit;
using System.Collections;
using System.Collections.Generic;
using Utkeyrslukerfi.API.Models;
using Utkeyrslukerfi.API.Models.InputModels;
using System.ComponentModel.DataAnnotations;
using Utkeyrslukerfi.API.Models.Entities;
using Utkeyrslukerfi.API.Repositories.Implementations;
using Utkeyrslukerfi.API.Models.Exceptions;
using AutoMapper;
using Utkeyrslukerfi.API;
using Utkeyrslukerfi.API.Repositories.Context;
using Microsoft.EntityFrameworkCore;
using Utkeyrslukerfi.API.Models.Dtos;
using Utkeyrslukerfi.API.Repositories.Interfaces;
using System.Linq;
using Moq;

namespace Tests
{
  public class UnitTestDeliveryRepository
  {
      private readonly UserRepository _userRepo;
      private readonly IMapper _mapper;
      private readonly Mock<IUtkeyrslukerfiDbContext> _mockContext = new Mock<IUtkeyrslukerfiDbContext>();

      public UnitTestDeliveryRepository(){
        _
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
        DeliveryAddressCountry = "null",
        VehicleID = Guid.NewGuid(),
        DriverID = Guid.NewGuid()
      });
    }
  }
  
  public class DeliveryDataInValid : TheoryData<DeliveryInputModel>{
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
        DeliveryAddressCountry = null,
        VehicleID = Guid.NewGuid(),
        DriverID = Guid.NewGuid()
      });
    }
  }

  public class DeliveryUpdateDataValid : TheoryData<DeliveryInputModel>{
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

  public class DeliveryTests
  {
    public class ValidateDeliveryCreate : ValidationAttribute
    {
      private static UtkeyrslukerfiDbContext GetContext(){
        var options = new DbContextOptionsBuilder<UtkeyrslukerfiDbContext>()
                              .UseInMemoryDatabase("Utkeyrslukerfi")
                              .Options;
        var dbContext = new UtkeyrslukerfiDbContext(options);
        return dbContext;
      }

      private static DeliveryRepository GetDeliveryRepository(UtkeyrslukerfiDbContext dbContext){
        // Generating Mapper annd dbcontext, as it's needed in the Repository class
        var mapperConfig = new MapperConfiguration(mc => { mc.AddProfile(new MappingProfile()); });
        var mapper = mapperConfig.CreateMapper();

        // Creating the Address Repository and Delivery Repository
        var addressRepo = new AddressRepository(mapper, dbContext);
        var delRepo = new DeliveryRepository(mapper, dbContext, addressRepo);
        return delRepo;
      }

      [Theory]
      [ClassData(typeof(DeliveryDataValid))]
      public void CanCreate(DeliveryInputModel data)
      {
        // getting the repository and dbcontext
        var dbContext = GetContext();
        var delRepo = GetDeliveryRepository(dbContext);

        var driver = new User()
        {
          ID = data.DriverID,
          Name = "Kalli Halli",
          Email = "Kalli@halli.is",
          Role = 3
        };
        dbContext.Users.Add(driver);

        // adding the vehicle to the database
        var vehicle = new Vehicle()
        {
          ID = data.VehicleID,
          LicensePlate = "YU354"
        };
        dbContext.Vehicles.Add(vehicle);
        dbContext.SaveChanges();

        var deliv = delRepo.CreateDelivery(data);
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
        // Checking Vehicle
        Assert.IsType<Guid>(deliv.Vehicle.ID);
        Assert.True(data.VehicleID == deliv.Vehicle.ID);
        // Checking Driver
        Assert.True(data.DriverID == deliv.Driver.ID);
      }

      private static Delivery GetDelivery(UtkeyrslukerfiDbContext dbContext, string deliveryID){
        
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

      [Theory]
      [ClassData(typeof(DeliveryDataInValid))]
      public void CanNotCreate(DeliveryInputModel data)
      {
        // getting the repository and dbcontext
        var dbContext = GetContext();
        var delRepo = GetDeliveryRepository(dbContext);
        // neither the driver nor the Vehicle exists
        Assert.Throws<NotFoundException>(() => delRepo.CreateDelivery(data));
        // adding the driver to the db
        var driver = new User()
        {
          ID = data.DriverID,
          Name = "Kalli Halli",
          Email = "Kalli@halli.is",
          Role = 3
        };
        Assert.Throws<NotFoundException>(() => delRepo.CreateDelivery(data));
      }

      [Theory]
      [ClassData(typeof(DeliveryUpdateDataValid))]
      public void CanUpdate(DeliveryInputModel data){
        var dbContext = GetContext();
        var delRepo = GetDeliveryRepository(dbContext);
        var deliveryID = "7340131602103";

        var delivery = GetDelivery(dbContext, deliveryID);

        dbContext.Deliveries.Add(delivery);

        dbContext.SaveChanges();

        // Update the valid delivery
        var updatedDeliv = dbContext.Deliveries
                                    .FirstOrDefault(d => d.ID == deliveryID);
        Assert.True(delivery.Equals(updatedDeliv));
        delRepo.UpdateDelivery(data, deliveryID);

        Assert.Equal()
        
        dbContext.Deliveries.Remove(delivery);
        dbContext.SaveChanges();
      }
    }

  }
}
