using System.ComponentModel.DataAnnotations;

namespace CatalogoProdutosAPI.Models
{
    public class Produto
    {

        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Nome { get; set; } = string.Empty;

        [MaxLength(500)]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "O preço deve ser maior que zero")]
        public decimal Preco { get; set; }

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "O estoque não pode ser negativo")]
        public int Estoque { get; set; }

        [Required]  
        public string Categoria { get; set; } = string.Empty;

        public string? ImagemUrl { get; set; }

        public bool Ativo { get; set; } = true;

        public DateTime DataCadastro { get; set; } = DateTime.Now;
        
    }
}