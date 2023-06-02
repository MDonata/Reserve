namespace RSV2.Models
{
    public class Reserva
    {
        public int Id { get; set; }
        public int Id_Usuario { get; set; }
        public int Id_Quadra { get; set; }
        public float Preco { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }

        public Reserva() { }
    }
}
