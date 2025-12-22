using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class MultiTenancyFinal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Staff_CompanyId_Email",
                table: "Staff");

            migrationBuilder.CreateIndex(
                name: "IX_Staff_CompanyId",
                table: "Staff",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Staff_Email",
                table: "Staff",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Staff_CompanyId",
                table: "Staff");

            migrationBuilder.DropIndex(
                name: "IX_Staff_Email",
                table: "Staff");

            migrationBuilder.CreateIndex(
                name: "IX_Staff_CompanyId_Email",
                table: "Staff",
                columns: new[] { "CompanyId", "Email" },
                unique: true);
        }
    }
}
