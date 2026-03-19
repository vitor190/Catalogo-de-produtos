import { useEffect, useState } from 'react';
import api from './services/api';
import { ProductCard } from './components/ProductCard';
import { FormularioProduto } from './components/FormularioProduto';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [produtoParaEditar, setProdutoParaEditar] = useState(null);

  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const carregarProdutos = () => {
    setLoading(true);
    api.get('/Produtos').then(r => { setProdutos(r.data); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { carregarProdutos(); }, []);

 
  const produtosFiltrados = produtos.filter(p => {
    const matchesSearch = p.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || p.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const abrirModal = (prod = null) => { setProdutoParaEditar(prod); setShowModal(true); };
  const fecharModal = () => { setShowModal(false); setProdutoParaEditar(null); };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans antialiased text-[#1F2937]">
      <header className="bg-white border-b border-[#E5E7EB] py-6 px-8 mb-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-[24px] md:text-[28px] font-bold">Catálogo Agilean</h1>
          
      
          <div className="flex flex-1 max-w-2xl w-full gap-3">
            <input 
              type="text"
              placeholder="Buscar produtos..."
              className="flex-1 border border-[#E5E7EB] p-3 rounded-[8px] outline-none focus:border-[#3B82F6]"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="border border-[#E5E7EB] p-3 rounded-[8px] bg-white outline-none focus:border-[#3B82F6]"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Todas as Categorias</option>
              <option value="Eletrônicos">Eletrônicos</option>
              <option value="Periféricos">Periféricos</option>
              <option value="Acessórios">Acessórios</option>
            </select>
          </div>

          <button onClick={() => abrirModal()} className="bg-[#3B82F6] text-white px-6 py-3 rounded-[8px] font-bold hover:bg-[#2563EB]">
            Criar Produto
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 pb-20">
        {loading ? (
          <div className="text-center py-20 text-[#6B7280]">Carregando...</div>
        ) : produtosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produtosFiltrados.map(p => (
              <ProductCard key={p.id} produto={p} aoExcluir={carregarProdutos} aoEditar={() => abrirModal(p)} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[12px] p-20 text-center border-2 border-dashed border-[#E5E7EB]">
            <p className="text-[#6B7280]">Nenhum produto encontrado para sua busca.</p>
          </div>
        )}
      </main>

      {showModal && (
        <FormularioProduto 
          produtoInicial={produtoParaEditar} 
          onClose={fecharModal} 
          onSuccess={() => { fecharModal(); carregarProdutos(); }} 
        />
      )}
    </div>
  );
}

export default App;