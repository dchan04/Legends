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
        public int speciesCode { get; set; }

        public string speciesName { get; set; } = String.Empty;

        public string defaultImg { get; set; } = String.Empty;

        public ICollection<Variant> Variants { get; set; }
    }
}
