using Microsoft.EntityFrameworkCore;

namespace LegendsTrackerBackend.Data
{
    internal sealed class LegendsDBContext : DbContext
    {
        public DbSet<Legends>? Legends { get; set; }

        public DbSet<Match>? Matches { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite(connectionString: "Data Source=./Data/SQlLiteDatabase.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            Legends[] legendsList = new Legends[3];
            legendsList[0] = new Legends
            {
                LegendID = 1,
                RiotCompanionID = "9e1423c2-d982-4db7-b478-f4d7235d51a1",
                SkinID = 23,
                Name = "Goodest Duckbill",
                Species = "Duckbill",
                Level = 2,
                ImgPath = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/loadouts/companions/tooltip_duckbill_base_variant7_tier2.littlelegends_11_22.png"
            };

            legendsList[1] = new Legends
            {
                LegendID = 2,
                RiotCompanionID = "3f358b24-6ca3-4943-85b1-8fb1981e93be",
                SkinID = 16,
                Name = "Honeybuzz Choncc",
                Species = "Choncc",
                Level = 1,
                ImgPath = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/loadouts/companions/tooltip_choncc_honeybuzz_tier1.png"
            };
            legendsList[2] = new Legends
            {
                LegendID = 3,
                RiotCompanionID = "3496e511-29bb-4c43-8fdb-2bafa5626e57",
                SkinID = 2,
                Name = "Chibi Firecracker Jinx",
                Species = "Jinx",
                Level = 1,
                ImgPath = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/loadouts/companions/tooltip_chibijinx_firecracker_firecracker1_tier1.pie_c_12_2.png"
            };

            modelBuilder.Entity<Legends>().HasData(data: legendsList);
        }
    }
}
