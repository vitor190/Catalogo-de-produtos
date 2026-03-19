import api from '../services/api';

export function ProductCard({ produto, aoExcluir }) {
  const getEstoqueStyle = (qtd) => {
    if (qtd >= 10) return "bg-[#D1FAE5] text-[#065F46]"; 
    if (qtd > 0) return "bg-[#FEF3C7] text-[#92400E]";   
    return "bg-[#FEE2E2] text-[#991B1B]";              
  };

  const handleDelete = async () => {
    if (window.confirm(`Deseja excluir "${produto.nome}"?`)) {
      try {
        await api.delete(`/Produtos/${produto.id}`);
        aoExcluir();
      } catch (err) {
        alert("Erro ao excluir.");
      }
    }
  };

  return (
    <div className="bg-white p-[16px] rounded-[12px] border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <img src={produto.imagemUrl || 'https://via.placeholder.com/150'} className="w-full h-40 object-cover rounded-[8px] mb-4" />
      
      <p className="text-[#6B7280] text-[12px] font-semibold uppercase tracking-wider">{produto.categoria}</p>
      <h3 className="text-[#1F2937] text-[18px] font-semibold mt-1">{produto.nome}</h3>
      <p className="text-[#1F2937] text-[20px] md:text-[22px] font-bold my-2">R$ {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
      
      <div className={`inline-flex items-center px-3 py-1 rounded-[6px] text-[12px] font-semibold w-fit mb-4 ${getEstoqueStyle(produto.estoque)}`}>
        {produto.estoque === 0 && <span className="mr-1">X</span>}
        {produto.estoque >= 10 ? `${produto.estoque} unidades` : 
         produto.estoque > 0 ? `Apenas ${produto.estoque} unidades` : 'Indisponível'}
      </div>

      <div className="flex gap-2 mt-auto">
        <button className="flex-1 border border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white py-[12px] rounded-[8px] font-semibold transition-all">
          Editar
        </button>
        <button 
          onClick={handleDelete}
          className="px-4 py-[12px] text-[#EF4444] hover:bg-red-50 rounded-[8px] font-semibold transition-all"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}