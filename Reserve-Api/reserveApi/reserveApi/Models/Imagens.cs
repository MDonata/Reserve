using System.ComponentModel.DataAnnotations;

namespace RSV2.Models
{
    public class Imagem
    {
        public int Id { get; set; }
        public int Id_Quadra { get; set; }
        [StringLength(255)]
        public string Link { get; set; } 

        public Imagem() { }
    }
}