using Microsoft.EntityFrameworkCore.Migrations;

namespace Utkeyrslukerfi.API.Migrations
{
    public partial class AddSignatureURI : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SignatureURI",
                table: "Signoffs",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SignatureURI",
                table: "Signoffs");
        }
    }
}
