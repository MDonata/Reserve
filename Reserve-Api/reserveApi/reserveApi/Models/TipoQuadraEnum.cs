using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace RSV2.Models
{
    public enum TipoQuadraEnum
    {
        [Description("Quadra de Futsal")]
        Futsal = 1,

        [Description("Quadra de Futebol")]
        Futebol = 2,

        [Description("Quadra Poliesportiva")]
        Poliesportiva = 3,

        [Description("Salão de Dança")]
        Danca = 4,

        [Description("Quadra de Vôlei de Areia")]
        Areia = 5,

        [Description("Quadra de Badminton")]
        Badminton = 6,

        [Description("Quadra de Basquete")]
        Basquete = 7,

        [Description("Pista de Corrida")]
        Corrida = 8,

        [Description("Quadra de Vôlei")]
        Volei = 9,
    }
}
