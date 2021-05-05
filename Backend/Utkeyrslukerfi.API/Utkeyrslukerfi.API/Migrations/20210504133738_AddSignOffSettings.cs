using Microsoft.EntityFrameworkCore.Migrations;

namespace Utkeyrslukerfi.API.Migrations
{
    public partial class AddSignOffSettings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Settings",
                table: "Signoffs",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Settings",
                table: "Signoffs");
        }
    }
}
