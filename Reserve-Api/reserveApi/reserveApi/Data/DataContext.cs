using Microsoft.EntityFrameworkCore;
using RSV2.Models;

namespace RSV2.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Quadra> Quadras { get; set; }
        public DbSet<Reserva> Reservas { get; set; }
        public DbSet<Imagem> Imagems { get; set; }

    }
}
