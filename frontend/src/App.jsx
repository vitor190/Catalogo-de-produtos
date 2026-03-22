import { useEffect, useState } from 'react';
import api from './services/api';
import { ProductCard } from './components/ProductCard';
import { ProductForm } from './components/ProductForm';
import { Sun, Moon } from 'lucide-react'; 

function App() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [produtoParaEditar, setProdutoParaEditar] = useState(null);
  const [isDark, setIsDark] = useState(false);
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
    setProdutoParaEditar(null);
  };

  return (
    <div className={`min-h-screen font-sans antialiased transition-all duration-500 ${isDark ? 'bg-[#111827] text-white' : 'bg-[#F9FAFB] text-[#1F2937]'}`}>
      <header className={`${isDark ? 'bg-[#1F2937] border-[#374151]' : 'bg-white border-[#E5E7EB]'} border-b py-6 px-8 mb-6 shadow-sm transition-colors`}>
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-[24px] md:text-[28px] font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#1F2937]'}`}>
                Catálogo Agilean
              </h1>
              <div className="flex flex-wrap gap-x-6 gap-y-1 mt-1 text-[14px]">
                <p className={`${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
                  Produtos: <span className="text-[#3B82F6] font-bold">{produtosExibidos.length}</span>
                </p>
                <p className={`${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
                  Valor do Catálogo: <span className="text-[#10B981] font-bold">
                    R$ {valorTotalCatalogo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsDark(!isDark)}
                className={`p-3 rounded-lg transition-all border ${isDark ? 'bg-[#374151] text-yellow-400 border-[#4B5563]' : 'bg-gray-100 text-gray-600 border-transparent'}`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button 
                onClick={() => abrirModal()} 
                className="bg-[#3B82F6] text-white px-6 py-3 rounded-[8px] font-bold text-[15px] hover:bg-[#2563EB] transition-all shadow-sm"
              >
                Criar Produto
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input 
              type="text"
              placeholder="Buscar produtos..."
              className={`md:col-span-2 border p-3 rounded-[8px] outline-none focus:border-[#3B82F6] transition-colors ${isDark ? 'bg-[#1F2937] border-[#4B5563] text-white' : 'bg-white border-[#E5E7EB] text-[#1F2937]'}`}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <select 
              className={`border p-3 rounded-[8px] outline-none transition-colors ${isDark ? 'bg-[#1F2937] border-[#4B5563] text-white' : 'bg-white border-[#E5E7EB] text-[#1F2937]'}`}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Todas as Categorias</option>
              <option value="Eletrônicos">Eletrônicos</option>
              <option value="Periféricos">Periféricos</option>
              <option value="Acessórios">Acessórios</option>
            </select>

            <select 
              className={`border p-3 rounded-[8px] outline-none transition-colors ${isDark ? 'bg-[#1F2937] border-[#4B5563] text-white' : 'bg-white border-[#E5E7EB] text-[#1F2937]'}`}
              onChange={(e) => setDisponibilidade(e.target.value)}
            >
              <option value="todos">Todos (Disponibilidade)</option>
              <option value="disponiveis">Disponíveis</option>
              <option value="sem-estoque">Sem Estoque</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-[14px]">
            <span className={isDark ? 'text-gray-400' : 'text-[#6B7280]'}>Ordenar por:</span>
            <select className={`bg-transparent font-semibold outline-none cursor-pointer ${isDark ? 'text-white' : 'text-[#1F2937]'}`} onChange={(e) => setOrdenacao(e.target.value)}>
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
          <div className="text-center py-20">Carregando catálogo...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produtosExibidos.map(p => (
              <ProductCard key={p.id} produto={p} isDark={isDark} aoExcluir={carregarProdutos} aoEditar={() => abrirModal(p)} />
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <ProductForm isDark={isDark} produtoInicial={produtoParaEditar} onClose={fecharModal} onSuccess={() => { fecharModal(); carregarProdutos(); }} />
      )}
    </div>
  );
}

export default App;