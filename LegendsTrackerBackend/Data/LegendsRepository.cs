using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace LegendsTrackerBackend.Data
{
    internal static class LegendsRepository
    {
        
        internal async static Task<List<Species>> GetSpeciesAsync()
        {
            using var db = new LegendsDBContext();
            var result = await db.Species
                .ToListAsync();
            return result;
        }

        internal async static Task<Species> GetSpeciesByIdAsync(int id)
        {
            using var db = new LegendsDBContext();
            return await db.Species
                .FirstOrDefaultAsync(predicate: Species => Species.SpeciesCode == id);
        }
        internal async static Task<List<Variant>> GetVariantsAsync()
        {
            using var db = new LegendsDBContext();
            return await db.Variants.OrderBy(c => c.VariantId).ToListAsync();
        }

        internal async static Task<int> GetTotalVariantCount()
        {
            using var db = new LegendsDBContext();
            return await db.Variants.CountAsync();
        }

        internal static Task<int> GetTotalVariantBySpeciesCount(int id)
        {

            using var db = new LegendsDBContext();
            int total = 0;
            var species = db.Species.Where(c => c.SpeciesCode == id).FirstOrDefault();
            var variantList = species.Variants;
            foreach (var Variant in variantList)
            {
                total += Variant.count;
            }
            return Task.FromResult(total);
        }

        internal async static Task<List<Species>> GetTop3Species()
        {
            using var db = new LegendsDBContext();
            var result = await db.Species.OrderByDescending(c => c.TotalCount).Take(3).ToListAsync();
            return result;
        }

        internal async static Task<List<Variant>> GetTop3Variants()
        {
            using var db = new LegendsDBContext();
            var result = await db.Variants
                .OrderByDescending(c => c.count).Take(3).ToListAsync();
            return result;
        }

    }
}
