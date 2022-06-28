using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LegendsTrackerBackend.Data
{
    public class Variant
    {
        [Key]
        public int VariantId { get; set; }

        public int VariantCode { get; set; }

        public int level { get; set; }

        public int count { get; set; }

        public string rarity { get; set; } = String.Empty;

        public string name { get; set; } = String.Empty;

        public string imgPath { get; set; } = String.Empty;

        public int SpeciesId { get; set; }
        public virtual Species Species { get; set; }
    }
}
