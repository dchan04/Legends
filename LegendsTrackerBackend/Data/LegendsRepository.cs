using Microsoft.EntityFrameworkCore;

namespace LegendsTrackerBackend.Data
{
    internal static class LegendsRepository
    {
        internal async static Task<List<Legends>> GetLegendsAsync()
        {
            using (var db = new LegendsDBContext())
            {
                return await db.Legends.ToListAsync();
            }
        }

        internal async static Task<Legends> GetLegendsByIdAsync(int legendId)
        {
            using (var db = new LegendsDBContext())
            {
                return await db.Legends
                    .FirstOrDefaultAsync(predicate: Legends => Legends.LegendID == legendId);
            }
        }

    }
}
