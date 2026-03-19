import { useEffect, useState } from 'react';
import api from './services/api';
import { ProductCard } from './components/ProductCard';
import { FormularioProduto } from './components/FormularioProduto';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans antialiased">
      <header className="bg-white border-b border-gray-200 py-6 px-8 mb-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-[24px] md:text-[28px] font-bold text-[#1F2937] tracking-tight">Catálogo Agilean</h1>
            <p className="text-[#6B7280] text-[14px]">Gerencie seus produtos com eficiência</p>
          </div>
          
          <button 
            onClick={() => setShowModal(true)}
            className="bg-[#3B82F6] text-white px-6 py-3 rounded-[8px] font-bold text-[15px] hover:bg-[#2563EB] transition-all shadow-sm"
          >
            Criar Produto
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 pb-20">
        {loading ? (
          <div className="text-center py-20 text-[#6B7280]">Carregando catálogo...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produtos.map(p => (
              <ProductCard key={p.id} produto={p} aoExcluir={carregarProdutos} />
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <FormularioProduto 
          onClose={() => setShowModal(false)} 
          onSuccess={() => {
            setShowModal(false);
            carregarProdutos();
          }} 
        />
      )}
    </div>
  );
}

export default App;