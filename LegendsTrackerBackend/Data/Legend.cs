using System.ComponentModel.DataAnnotations;

namespace LegendsTrackerBackend.Data
{
    internal sealed class Legends
    {
        [Key]
        public int LegendID { get; set; }

        [Required]
        public int SkinID { get; set; }

        [Required]
        public int Level { get; set; }

        [Required]
        [MaxLength(length: 100000)]
        public string RiotCompanionID { get; set; } = String.Empty;

        [Required]
        [MaxLength(length: 100000)]
        public string Name { get; set; } = String.Empty;

        [Required]
        [MaxLength(length: 100000)]
        public string Species { get; set; } = String.Empty;

        [Required]
        [MaxLength(length: 100000)]
        public string ImgPath { get; set; } = String.Empty;

    }
}
