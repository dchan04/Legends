using Microsoft.EntityFrameworkCore;

namespace LegendsTrackerBackend.Data
{
    public class LegendsDBContext : DbContext
    {
        public DbSet<Species>? Species { get; set; }

        public DbSet<Variant>? Variants { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite(connectionString: "Data Source=./Data/AppDb.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Variant>()
                .HasOne<Species>(s => s.Species)
                .WithMany(s => s.Variants)
                .HasForeignKey(s => s.SpeciesId);

        }
    }
}
