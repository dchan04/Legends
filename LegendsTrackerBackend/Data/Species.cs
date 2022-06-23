using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LegendsTrackerBackend.Data
{
    public class Species
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int id { get; set; }

        [Required]
        public int speciesId { get; set; }

        [Required]
        public string speciesName { get; set; } = String.Empty;

        [Required]
        public string defaultImg { get; set; } = String.Empty;


    }
}
