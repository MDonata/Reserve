using System.ComponentModel.DataAnnotations;

namespace RSV2.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        [StringLength(50)]
        public string Nome { get; set; }
        [StringLength(50)]
        public string Email { get; set; }
        [StringLength(50)]
        public string Senha { get; set; }
        public int Tipo { get; set; }

        public Usuario() { }
    }
}