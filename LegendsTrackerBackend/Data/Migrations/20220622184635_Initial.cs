using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LegendsTrackerBackend.Data.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "species",
                columns: table => new
                {
                    speciesId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    speciesName = table.Column<string>(type: "TEXT", nullable: false),
                    defaultImg = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_species", x => x.speciesId);
                });

            migrationBuilder.InsertData(
                table: "species",
                columns: new[] { "speciesId", "defaultImg", "speciesName" },
                values: new object[] { 23, "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/loadouts/companions/tooltip_duckbill_base_variant7_tier2.littlelegends_11_22.png", "Goodest Duckbill" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "species");
        }
    }
}
