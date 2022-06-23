using Microsoft.EntityFrameworkCore;

namespace LegendsTrackerBackend.Data
{
    public class LegendsDBContext : DbContext
    {
        public DbSet<Species>? species { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite(connectionString: "Data Source=./Data/AppDb.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }
    }
}
