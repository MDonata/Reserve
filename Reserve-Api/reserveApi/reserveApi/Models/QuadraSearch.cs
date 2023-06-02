using System.ComponentModel.DataAnnotations;

namespace RSV2.Models
{
    public class QuadraSearch
    {
        public string? Texto { get; set; }
        public string? Endereco { get; set; }
        public string? Estado { get; set; }
        public string? Cidade { get; set; }
        public int? Tipo { get; set; }
        public string? Descricao { get; set; }
        public string? Items { get; set; }
        public float? PrecoMinimo { get; set; }
        public float? PrecoMaximo { get; set; }

        public QuadraSearch() { }
    }
}
