import { useEffect, useState } from 'react';
import api from './services/api';
import { ProductCard } from './components/ProductCard';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    api.get('/Produtos')
      .then(response => {
        setProdutos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans antialiased">
    
      <header className="bg-white border-b border-gray-200 py-6 px-8 mb-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-[28px] font-extrabold text-[#1F2937] tracking-tight">Catálogo Agilean</h1>
            <p className="text-[#6B7280] text-[14px]">Gerencie seus produtos com eficiência</p>
          </div>
          <button className="bg-[#10B981] text-white px-6 py-3 rounded-[8px] font-bold text-[15px] shadow-sm hover:bg-[#059669] transition-all">
            + Novo Produto
          </button>
        </div>
      </header>

     
      <main className="max-w-7xl mx-auto px-8 pb-20">
        {loading ? (
          <div className="text-center py-20 text-[#6B7280] font-medium">Carregando catálogo...</div>
        ) : produtos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {produtos.map(p => (
              <ProductCard key={p.id} produto={p} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[12px] p-20 text-center border-2 border-dashed border-gray-200">
            <p className="text-[#6B7280] text-[18px]">Nenhum produto cadastrado no banco SQLite.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;