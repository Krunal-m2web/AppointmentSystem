using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddUniqueFilteredIndexes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Drop old indexes if they exist (using safe SQL)
            migrationBuilder.Sql(@"
                IF EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_Services_CompanyId_Name' AND object_id = OBJECT_ID('Services'))
                    DROP INDEX [IX_Services_CompanyId_Name] ON [Services];
            ");

            migrationBuilder.Sql(@"
                IF EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_Customers_CompanyId_Email' AND object_id = OBJECT_ID('Customers'))
                    DROP INDEX [IX_Customers_CompanyId_Email] ON [Customers];
            ");

            // Drop new indexes if they already exist (in case of partial previous migration)
            migrationBuilder.Sql(@"
                IF EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_Services_CompanyId_Name_Active' AND object_id = OBJECT_ID('Services'))
                    DROP INDEX [IX_Services_CompanyId_Name_Active] ON [Services];
            ");

            // Create new unique filtered indexes
            migrationBuilder.CreateIndex(
                name: "IX_Services_CompanyId_Name_Active",
                table: "Services",
                columns: new[] { "CompanyId", "Name" },
                unique: true,
                filter: "[IsActive] = 1");

            migrationBuilder.CreateIndex(
                name: "IX_Customers_CompanyId_Email",
                table: "Customers",
                columns: new[] { "CompanyId", "Email" },
                unique: true,
                filter: "[IsActive] = 1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Services_CompanyId_Name_Active",
                table: "Services");

            migrationBuilder.DropIndex(
                name: "IX_Customers_CompanyId_Email",
                table: "Customers");

            migrationBuilder.CreateIndex(
                name: "IX_Services_CompanyId_Name",
                table: "Services",
                columns: new[] { "CompanyId", "Name" });

            migrationBuilder.CreateIndex(
                name: "IX_Customers_CompanyId_Email",
                table: "Customers",
                columns: new[] { "CompanyId", "Email" },
                unique: true);
        }
    }
}
