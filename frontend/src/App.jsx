import { useEffect, useState } from 'react';
import api from './services/api';
import { ProductCard } from './components/ProductCard';
import { ProductForm } from './components/ProductForm';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [produtoParaEditar, setProdutoParaEditar] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [disponibilidade, setDisponibilidade] = useState('todos'); 
  const [ordenacao, setOrdenacao] = useState('recentes'); 
  
  const carregarProdutos = () => {
    setLoading(true);
    api.get('/Produtos')
      .then(response => {
        setProdutos(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { carregarProdutos(); }, []);

  const produtosExibidos = produtos
    .filter(p => {
      const matchesSearch = p.nome.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '' || p.categoria === selectedCategory;
      const matchesDisponibilidade = 
        disponibilidade === 'todos' ? true :
        disponibilidade === 'disponiveis' ? p.estoque > 0 :
        p.estoque === 0;

      return matchesSearch && matchesCategory && matchesDisponibilidade;
    })
    .sort((a, b) => {
      if (ordenacao === 'nome') return a.nome.localeCompare(b.nome);
      if (ordenacao === 'preco-menor') return a.preco - b.preco;
      if (ordenacao === 'preco-maior') return b.preco - a.preco;
      if (ordenacao === 'recentes') return new Date(b.dataCadastro) - new Date(a.dataCadastro);
      return 0;
    });

  const valorTotalCatalogo = produtosExibidos.reduce((acc, p) => acc + p.preco, 0);

  const abrirModal = (produto = null) => {
    setProdutoParaEditar(produto);
    setShowModal(true);
  };

  const fecharModal = () => {
    setShowModal(false);
    setProductToEdit(null);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans antialiased text-[#1F2937]">
      <header className="bg-white border-b border-[#E5E7EB] py-6 px-8 mb-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-[24px] md:text-[28px] font-bold tracking-tight">Catálogo Agilean</h1>
              <div className="flex flex-wrap gap-x-6 gap-y-1 mt-1 text-[14px]">
                <p className="text-[#6B7280]">
                  Produtos: <span className="text-[#3B82F6] font-bold">{produtosExibidos.length}</span>
                </p>
                <p className="text-[#6B7280]">
                  Valor do Catálogo: <span className="text-[#10B981] font-bold">
                    R$ {valorTotalCatalogo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </p>
              </div>
            </div>

            <button 
              onClick={() => abrirModal()} 
              className="bg-[#3B82F6] text-white px-6 py-3 rounded-[8px] font-bold text-[15px] hover:bg-[#2563EB] transition-all"
            >
              Criar Produto
            </button>
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input 
              type="text"
              placeholder="Buscar produtos..."
              className="md:col-span-2 border border-[#E5E7EB] p-3 rounded-[8px] outline-none focus:border-[#3B82F6]"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select className="border border-[#E5E7EB] p-3 rounded-[8px] bg-white outline-none" onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">Todas as Categorias</option>
              <option value="Eletrônicos">Eletrônicos</option>
              <option value="Periféricos">Periféricos</option>
              <option value="Acessórios">Acessórios</option>
            </select>
            <select className="border border-[#E5E7EB] p-3 rounded-[8px] bg-white outline-none" onChange={(e) => setDisponibilidade(e.target.value)}>
              <option value="todos">Todos (Disponibilidade)</option>
              <option value="disponiveis">Disponíveis</option>
              <option value="sem-estoque">Sem Estoque</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-[14px] text-[#6B7280]">
            <span>Ordenar por:</span>
            <select className="bg-transparent font-semibold text-[#1F2937] outline-none cursor-pointer" onChange={(e) => setOrdenacao(e.target.value)}>
              <option value="recentes">Mais Recentes</option>
              <option value="nome">Nome (A-Z)</option>
              <option value="preco-menor">Menor Preço</option>
              <option value="preco-maior">Maior Preço</option>
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 pb-20">
        {loading ? (
          <div className="text-center py-20 text-[#6B7280]">Carregando catálogo...</div>
        ) : produtosExibidos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produtosExibidos.map(p => (
              <ProductCard key={p.id} produto={p} aoExcluir={carregarProdutos} aoEditar={() => abrirModal(p)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[12px] border-2 border-dashed border-[#E5E7EB]">
            <p className="text-[#6B7280]">Nenhum produto encontrado.</p>
          </div>
        )}
      </main>

      {showModal && (
        <ProductForm produtoInicial={produtoParaEditar} onClose={() => setShowModal(false)} onSuccess={() => { setShowModal(false); carregarProdutos(); }} />
      )}
    </div>
  );
}

export default App;