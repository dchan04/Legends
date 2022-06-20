using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LegendsTrackerBackend.Data.Migrations
{
    public partial class FirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Legends",
                columns: table => new
                {
                    LegendID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SkinID = table.Column<int>(type: "INTEGER", nullable: false),
                    Level = table.Column<int>(type: "INTEGER", nullable: false),
                    RiotCompanionID = table.Column<string>(type: "TEXT", maxLength: 100000, nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100000, nullable: false),
                    Species = table.Column<string>(type: "TEXT", maxLength: 100000, nullable: false),
                    ImgPath = table.Column<string>(type: "TEXT", maxLength: 100000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Legends", x => x.LegendID);
                });

            migrationBuilder.CreateTable(
                name: "Matches",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RiotMatchID = table.Column<string>(type: "TEXT", maxLength: 100000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Matches", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Legends",
                columns: new[] { "LegendID", "ImgPath", "Level", "Name", "RiotCompanionID", "SkinID", "Species" },
                values: new object[] { 1, "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/loadouts/companions/tooltip_duckbill_base_variant7_tier2.littlelegends_11_22.png", 2, "Goodest Duckbill", "9e1423c2-d982-4db7-b478-f4d7235d51a1", 23, "Duckbill" });

            migrationBuilder.InsertData(
                table: "Legends",
                columns: new[] { "LegendID", "ImgPath", "Level", "Name", "RiotCompanionID", "SkinID", "Species" },
                values: new object[] { 2, "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/loadouts/companions/tooltip_choncc_honeybuzz_tier1.png", 1, "Honeybuzz Choncc", "3f358b24-6ca3-4943-85b1-8fb1981e93be", 16, "Choncc" });

            migrationBuilder.InsertData(
                table: "Legends",
                columns: new[] { "LegendID", "ImgPath", "Level", "Name", "RiotCompanionID", "SkinID", "Species" },
                values: new object[] { 3, "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/loadouts/companions/tooltip_chibijinx_firecracker_firecracker1_tier1.pie_c_12_2.png", 1, "Chibi Firecracker Jinx", "3496e511-29bb-4c43-8fdb-2bafa5626e57", 2, "Jinx" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Legends");

            migrationBuilder.DropTable(
                name: "Matches");
        }
    }
}
