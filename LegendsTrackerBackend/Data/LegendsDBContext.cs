using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Configuration;

namespace LegendsTrackerBackend.Data
{
    public class LegendsDBContext : DbContext
    {

        public DbSet<Species>? Species { get; set; }

        public DbSet<Variant>? Variants { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite(connectionString: "Data Source=./Data/AppDb.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Species>().Navigation(c => c.Variants).AutoInclude();
            modelBuilder.Entity<Species>().HasMany(s => s.Variants);

        }
    }
}
