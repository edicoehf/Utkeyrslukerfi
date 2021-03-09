using Microsoft.EntityFrameworkCore.Migrations;

namespace Utkeyrslukerfi.API.Migrations
{
    public partial class modifiedDelivery : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CustomerComment",
                table: "Deliveries",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DriverComment",
                table: "Deliveries",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CustomerComment",
                table: "Deliveries");

            migrationBuilder.DropColumn(
                name: "DriverComment",
                table: "Deliveries");
        }
    }
}
