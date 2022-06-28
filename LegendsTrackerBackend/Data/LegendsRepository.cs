using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
namespace LegendsTrackerBackend.Data
{
    internal static class LegendsRepository
    {
        internal async static Task<List<Species>> GetSpeciesAsync()
        {
            using (var db = new LegendsDBContext())
            {
                return await db.Species.OrderBy(c => c.SpeciesName).ToListAsync();
            }
        }

        internal async static Task<Species> GetSpeciesByIdAsync(int id)
        {
            using (var db = new LegendsDBContext())
            {
                return await db.Species
                    .FirstOrDefaultAsync(predicate: Species => Species.SpeciesCode == id);
            }
        }
        internal async static Task<List<Variant>> GetVariantsAsync()
        {
            using (var db = new LegendsDBContext())
            {
                return await db.Variants.OrderBy(c => c.VariantId).ToListAsync();
            }
        }

    }
}
