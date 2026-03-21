using Microsoft.EntityFrameworkCore;
using CatalogoProdutosAPI.Models;

namespace CatalogoProdutosAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Produtos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .Property(p => p.Preco)
                .HasPrecision(18, 2);
        }
    }
}