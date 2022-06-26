using Microsoft.EntityFrameworkCore;

namespace LegendsTrackerBackend.Data
{
    public class LegendsDBContext : DbContext
    {
        public DbSet<Species>? species { get; set; }

        public DbSet<Variant>? variants { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite(connectionString: "Data Source=./Data/AppDb.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Variant>()
                .HasOne(p => p.species)
                .WithMany(b => b.Variants)
                .HasForeignKey(s=>s.speciesId);
        }
    }
}
