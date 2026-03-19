export function ProductCard({ produto }) {
  // Lógica de Cores por Estado [cite: 98]
  const getEstoqueStyle = (qtd) => {
    if (qtd >= 10) return "bg-[#D1FAE5] text-[#065F46] shadow-sm"; 
    if (qtd > 0) return "bg-[#FEF3C7] text-[#92400E] shadow-sm";   
    return "bg-[#FEE2E2] text-[#991B1B] shadow-sm";              
  };

  return (
    <div className="bg-card-bg p-[16px] rounded-card border border-border-ui shadow-sm hover:shadow-md transition-all duration-300">
     
      <img src={produto.imagemUrl} className="w-full h-40 object-cover rounded-[8px] mb-4" />
      
    
      <p className="text-txt-secondary text-[12px] font-semibold uppercase">{produto.categoria}</p>
      <h3 className="text-txt-primary text-[18px] font-semibold mt-1">{produto.nome}</h3>
      <p className="text-txt-primary text-[22px] font-bold my-2">R$ {produto.preco}</p>
      
    
      <div className={`inline-flex items-center px-3 py-1 rounded-[6px] text-[12px] font-semibold ${getEstoqueStyle(produto.estoque)}`}>
        {produto.estoque === 0 && <span className="mr-1">X</span>}
        {produto.estoque >= 10 ? `${produto.estoque} unidades` : 
         produto.estoque > 0 ? `Apenas ${produto.estoque} unidades` : 'Indisponível'}
      </div>

      <div className="flex gap-2 mt-4">
        <button className="flex-1 bg-gray-100 text-txt-primary py-[12px] rounded-btn font-semibold hover:bg-gray-200">Editar</button>
        <button className="p-[12px] text-danger hover:bg-red-50 rounded-btn font-semibold">Excluir</button>
      </div>
    </div>
  );
}