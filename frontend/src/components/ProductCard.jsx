import api from '../services/api';

export function ProductCard({ produto, aoExcluir, aoEditar }) {
  const getEstoqueStyle = (qtd) => {
    if (qtd >= 10) return "bg-[#D1FAE5] text-[#065F46]"; 
    if (qtd > 0) return "bg-[#FEF3C7] text-[#92400E]";   
    return "bg-[#FEE2E2] text-[#991B1B]";              
  };

  const handleDelete = async () => {
    if (window.confirm(`Deseja realmente remover o produto "${produto.nome}"?`)) {
      try {
        await api.delete(`/Produtos/${produto.id}`);
        aoExcluir();
      } catch (err) {
        alert("Erro ao excluir.");
      }
    }
  };

  // Lógica de estilo: Forçamos o fundo branco sempre. 
  // Se estiver inativo, apenas reduzimos a opacidade levemente.
  const cardStatusStyle = produto.ativo 
    ? "bg-white opacity-100" 
    : "bg-white opacity-70 grayscale-[0.3]";

  return (
    <div className={`${cardStatusStyle} p-[16px] rounded-[12px] border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full relative`}>
      
      {/* Badge visual apenas se estiver inativo */}
      {!produto.ativo && (
        <span className="absolute top-2 right-2 bg-gray-400 text-white text-[10px] font-bold px-2 py-1 rounded-[4px] z-10">
          INATIVO
        </span>
      )}

      {/* Container da Imagem */}
      <div className="w-full h-40 bg-gray-50 rounded-[8px] mb-4 overflow-hidden border border-gray-100">
        <img 
          src={produto.imagemUrl || 'https://via.placeholder.com/300x200?text=Sem+Imagem'} 
          className="w-full h-full object-cover" 
          alt={produto.nome}
        />
      </div>
      
      {/* Informações do Produto com cores fixas escuras */}
      <p className="text-[#6B7280] text-[11px] font-bold uppercase tracking-widest">
        {produto.categoria}
      </p>
      
      <h3 className="text-[#1F2937] text-[17px] font-semibold mt-1 leading-tight">
        {produto.nome}
      </h3>
      
      <p className="text-[#1F2937] text-[22px] font-extrabold my-2">
        R$ {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
      </p>
      
      {/* Badge de Estoque */}
      <div className={`inline-flex items-center px-3 py-1 rounded-[6px] text-[12px] font-semibold w-fit mb-4 ${getEstoqueStyle(produto.estoque)}`}>
        {produto.estoque === 0 && <span className="mr-1">X</span>}
        {produto.estoque >= 10 ? `${produto.estoque} unidades` : 
         produto.estoque > 0 ? `Apenas ${produto.estoque} unidades` : 'Sem estoque'}
      </div>

      {/* Botões de Ação */}
      <div className="flex gap-2 mt-auto">
        <button 
          onClick={aoEditar} 
          className="flex-1 border border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white py-[12px] rounded-[8px] font-bold text-[14px] transition-all"
        >
          Editar
        </button>
        <button 
          onClick={handleDelete}
          className="px-4 py-[12px] text-[#EF4444] hover:bg-red-50 rounded-[8px] font-bold text-[14px] transition-all"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}