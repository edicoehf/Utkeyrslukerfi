using Microsoft.EntityFrameworkCore.Migrations;

namespace Utkeyrslukerfi.API.Migrations
{
    public partial class UserTableChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TokenID",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TokenID",
                table: "Users");
        }
    }
}
