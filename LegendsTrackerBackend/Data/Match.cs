using System.ComponentModel.DataAnnotations;

namespace LegendsTrackerBackend.Data
{
    internal sealed class Match
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(length: 100000)]
        public string RiotMatchID { get; set; } = String.Empty;
    }
}
