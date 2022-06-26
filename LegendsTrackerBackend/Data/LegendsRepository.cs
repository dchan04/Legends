using Microsoft.EntityFrameworkCore;

namespace LegendsTrackerBackend.Data
{
    internal static class LegendsRepository
    {
        internal async static Task<List<Species>> GetSpeciesAsync()
        {
            using (var db = new LegendsDBContext())
            {
                return await db.species.OrderBy(c => c.speciesName).ToListAsync();
            }
        }

        internal async static Task<Species> GetSpeciesByIdAsync(int id)
        {
            using (var db = new LegendsDBContext())
            {
                return await db.species
                    .FirstOrDefaultAsync(predicate: Species => Species.speciesCode == id);
            }
        }

    }
}
