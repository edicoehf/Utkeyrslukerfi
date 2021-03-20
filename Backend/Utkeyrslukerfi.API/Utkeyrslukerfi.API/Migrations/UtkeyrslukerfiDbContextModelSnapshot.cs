﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Utkeyrslukerfi.API.Repositories.Context;

namespace Utkeyrslukerfi.API.Migrations
{
    [DbContext(typeof(UtkeyrslukerfiDbContext))]
    partial class UtkeyrslukerfiDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 64)
                .HasAnnotation("ProductVersion", "5.0.3");

            modelBuilder.Entity("Utkeyrslukerfi.API.Models.Entities.Address", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("City")
                        .HasColumnType("text");

                    b.Property<string>("Country")
                        .HasColumnType("text");

                    b.Property<string>("HouseNumber")
                        .HasColumnType("text");

                    b.Property<string>("StreetName")
                        .HasColumnType("text");

                    b.Property<string>("ZipCode")
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("Utkeyrslukerfi.API.Models.Entities.Delivery", b =>
                {
                    b.Property<string>("ID")
                        .HasColumnType("varchar(767)");

                    b.Property<string>("CustomerComment")
                        .HasColumnType("text");

                    b.Property<int>("DeliveryAddressID")
                        .HasColumnType("int");

                    b.Property<string>("DriverComment")
                        .HasColumnType("text");

                    b.Property<int?>("DriverID")
                        .HasColumnType("int");

                    b.Property<int>("PickupAddressID")
                        .HasColumnType("int");

                    b.Property<string>("Recipient")
                        .HasColumnType("text");

                    b.Property<string>("Seller")
                        .HasColumnType("text");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<int?>("VehicleID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("DeliveryAddressID");

                    b.HasIndex("DriverID");

                    b.HasIndex("PickupAddressID");

                    b.HasIndex("VehicleID");

                    b.ToTable("Deliveries");
                });

            modelBuilder.Entity("Utkeyrslukerfi.API.Models.Entities.JwtToken", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("Blacklisted")
                        .HasColumnType("tinyint(1)");

                    b.Property<int?>("UserID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("UserID");

                    b.ToTable("JwtTokens");
                });

            modelBuilder.Entity("Utkeyrslukerfi.API.Models.Entities.Package", b =>
                {
                    b.Property<string>("ID")
                        .HasColumnType("varchar(767)");

                    b.Property<string>("DeliveryID")
                        .HasColumnType("varchar(767)");

                    b.Property<double>("Height")
                        .HasColumnType("double");

                    b.Property<double>("Length")
                        .HasColumnType("double");

                    b.Property<double>("Weight")
                        .HasColumnType("double");

                    b.Property<double>("Width")
                        .HasColumnType("double");

                    b.HasKey("ID");

                    b.HasIndex("DeliveryID");

                    b.ToTable("Packages");
                });

            modelBuilder.Entity("Utkeyrslukerfi.API.Models.Entities.Signoff", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("DeliveryID")
                        .HasColumnType("varchar(767)");

                    b.Property<string>("ImageURI")
                        .HasColumnType("text");

                    b.Property<string>("Recipient")
                        .HasColumnType("text");

                    b.Property<string>("SignatureUri")
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.HasIndex("DeliveryID")
                        .IsUnique();

                    b.ToTable("Signoffs");
                });

            modelBuilder.Entity("Utkeyrslukerfi.API.Models.Entities.User", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("ChangePassword")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Utkeyrslukerfi.API.Models.Entities.Vehicle", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<double>("Height")
                        .HasColumnType("double");

                    b.Property<double>("Length")
                        .HasColumnType("double");

                    b.Property<string>("LicensePlate")
                        .HasColumnType("text");

                    b.Property<double>("Width")
                        .HasColumnType("double");

                    b.HasKey("ID");

                    b.ToTable("Vehicles");
                });

            modelBuilder.Entity("Utkeyrslukerfi.API.Models.Entities.Delivery", b =>
                {
                    b.HasOne("Utkeyrslukerfi.API.Models.Entities.Address", "DeliveryAddress")
                        .WithMany()
                        .HasForeignKey("DeliveryAddressID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Utkeyrslukerfi.API.Models.Entities.User", "Driver")
                        .WithMany("Deliveries")
                        .HasForeignKey("DriverID");

                    b.HasOne("Utkeyrslukerfi.API.Models.Entities.Address", "PickupAddress")
                        .WithMany()
                        .HasForeignKey("PickupAddressID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Utkeyrslukerfi.API.Models.Entities.Vehicle", "Vehicle")
                        .WithMany("Deliveries")
                        .HasForeignKey("VehicleID");

                    b.Navigation("DeliveryAddress");

                    b.Navigation("Driver");

                    b.Navigation("PickupAddress");

                    b.Navigation("Vehicle");
                });

            modelBuilder.Entity("Utkeyrslukerfi.API.Models.Entities.JwtToken", b =>
                {
                    b.HasOne("Utkeyrslukerfi.API.Models.Entities.User", "User")
                        .WithMany("JwtTokens")
                        .HasForeignKey("UserID");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Utkeyrslukerfi.API.Models.Entities.Package", b =>
                {
                    b.HasOne("Utkeyrslukerfi.API.Models.Entities.Delivery", "Delivery")
                        .WithMany("Packages")
                        .HasForeignKey("DeliveryID");

                    b.Navigation("Delivery");
                });

            modelBuilder.Entity("Utkeyrslukerfi.API.Models.Entities.Signoff", b =>
                {
                    b.HasOne("Utkeyrslukerfi.API.Models.Entities.Delivery", "Delivery")
                        .WithOne("Signoff")
                        .HasForeignKey("Utkeyrslukerfi.API.Models.Entities.Signoff", "DeliveryID");

                    b.Navigation("Delivery");
                });

            modelBuilder.Entity("Utkeyrslukerfi.API.Models.Entities.Delivery", b =>
                {
                    b.Navigation("Packages");

                    b.Navigation("Signoff");
                });

            modelBuilder.Entity("Utkeyrslukerfi.API.Models.Entities.User", b =>
                {
                    b.Navigation("Deliveries");

                    b.Navigation("JwtTokens");
                });

            modelBuilder.Entity("Utkeyrslukerfi.API.Models.Entities.Vehicle", b =>
                {
                    b.Navigation("Deliveries");
                });
#pragma warning restore 612, 618
        }
    }
}
