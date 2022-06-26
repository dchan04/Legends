using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LegendsTrackerBackend.Data.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "species",
                columns: table => new
                {
                    SpeciesId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    speciesCode = table.Column<int>(type: "INTEGER", nullable: false),
                    speciesName = table.Column<string>(type: "TEXT", nullable: false),
                    defaultImg = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_species", x => x.SpeciesId);
                });

            migrationBuilder.CreateTable(
                name: "variants",
                columns: table => new
                {
                    VariantId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    VariantCode = table.Column<int>(type: "INTEGER", nullable: false),
                    level = table.Column<int>(type: "INTEGER", nullable: false),
                    count = table.Column<int>(type: "INTEGER", nullable: false),
                    rarity = table.Column<string>(type: "TEXT", nullable: false),
                    name = table.Column<string>(type: "TEXT", nullable: false),
                    imgPath = table.Column<string>(type: "TEXT", nullable: false),
                    speciesId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_variants", x => x.VariantId);
                    table.ForeignKey(
                        name: "FK_variants_species_speciesId",
                        column: x => x.speciesId,
                        principalTable: "species",
                        principalColumn: "SpeciesId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_variants_speciesId",
                table: "variants",
                column: "speciesId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "variants");

            migrationBuilder.DropTable(
                name: "species");
        }
    }
}
