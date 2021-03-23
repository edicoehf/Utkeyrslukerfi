using Microsoft.EntityFrameworkCore.Migrations;

namespace Utkeyrslukerfi.API.Migrations
{
    public partial class UserTokenRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserID",
                table: "JwtTokens",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_JwtTokens_UserID",
                table: "JwtTokens",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_JwtTokens_Users_UserID",
                table: "JwtTokens",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JwtTokens_Users_UserID",
                table: "JwtTokens");

            migrationBuilder.DropIndex(
                name: "IX_JwtTokens_UserID",
                table: "JwtTokens");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "JwtTokens");
        }
    }
}
