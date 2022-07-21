using SQLite;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LegendsTrackerBackend.Data
{
    public class Species
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SpeciesId { get; set; }

        [Unique]
        public int SpeciesCode { get; set; }

        public string SpeciesName { get; set; } = String.Empty;

        public string DefaultImg { get; set; } = String.Empty;

        public int TotalCount { get; set; }

        public virtual List<Variant> Variants { get; set; } = new List<Variant>();
    }
}
