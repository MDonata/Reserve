using System.ComponentModel.DataAnnotations;

namespace RSV2.Models
{
    public class Quadra
    {
        public int Id { get; set; }
        public int Id_Fornecedor { get; set; }
        [StringLength(50)]
        public string Endereco { get; set; }
        [StringLength(50)]
        public string Estado { get; set; }
        [StringLength(50)]
        public string Cidade { get; set; }
        public int Tipo { get; set; }
        [StringLength(255)]
        public string? Descricao { get; set; }
        [StringLength(255)]
        public string? Items { get; set; }
        [StringLength(255)]
        public string? ImgPrincipal { get; set; }
        public float PrecoHora { get; set; }


        public Quadra() { }
    }
}
