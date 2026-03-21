import { useState, useEffect } from 'react';
import api from '../services/api';

export function FormularioProduto({ onClose, onSuccess, produtoInicial }) {
  const [formData, setFormData] = useState({
    nome: '', 
    descricao: '', 
    preco: "", estoque: "", 
    categoria: '', 
    imagemUrl: '',
    ativo: true
  });

  const [erros, setErros] = useState({});

  useEffect(() => {
    if (produtoInicial) {
      setFormData(produtoInicial);
    }
  }, [produtoInicial]);

  const validar = () => {
    let e = {};
    if (!formData.nome || formData.nome.length > 100) e.nome = "Nome obrigatório (máx 100 caracteres)"; 
    if (formData.preco <= 0) e.preco = "Preço deve ser maior que 0"; 
    if (formData.estoque < 0) e.estoque = "Estoque não pode ser negativo"; 
    if (!formData.categoria) e.categoria = "Categoria obrigatória"; 
    
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const handleSalvar = async () => {
    if (!validar()) return;

    try {
      if (produtoInicial) {
        await api.put(`/Produtos/${produtoInicial.id}`, formData);
      } else {
        await api.post('/Produtos', formData);
      }
      onSuccess();
    } catch (err) {
      alert("Erro ao processar produto no banco .NET");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-[12px] p-[30px] w-full max-w-[500px] shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[24px] font-bold text-[#1F2937]">
            {produtoInicial ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[14px] font-semibold mb-1">Nome do Produto *</label>
            <input 
              value={formData.nome}
              className="w-full border border-[#E5E7EB] p-3 rounded-[8px] focus:ring-2 focus:ring-[#3B82F6] outline-none"
              onChange={e => setFormData({...formData, nome: e.target.value})}
            />
            {erros.nome && <p className="text-[#EF4444] text-xs mt-1">{erros.nome}</p>}
          </div>

          <div>
            <label className="block text-[14px] font-semibold mb-1">Descrição</label>
            <textarea 
              value={formData.descricao}
              rows="3"
              className="w-full border border-[#E5E7EB] p-3 rounded-[8px] focus:ring-2 focus:ring-[#3B82F6] outline-none resize-none"
              onChange={e => setFormData({...formData, descricao: e.target.value})}
            ></textarea>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-[14px] font-semibold mb-1">Preço (R$) *</label>
              <input 
                type="number"
                value={formData.preco}
                className="w-full border border-[#E5E7EB] p-3 rounded-[8px]"
                onChange={e => setFormData({...formData, preco: Number(e.target.value)})}
              />
              {erros.preco && <p className="text-[#EF4444] text-xs mt-1">{erros.preco}</p>}
            </div>
            <div className="flex-1">
              <label className="block text-[14px] font-semibold mb-1">Estoque *</label>
              <input 
                type="number"
                value={formData.estoque}
                className="w-full border border-[#E5E7EB] p-3 rounded-[8px]"
                onChange={e => setFormData({...formData, estoque: Number(e.target.value)})}
              />
              {erros.estoque && <p className="text-[#EF4444] text-xs mt-1">{erros.estoque}</p>}
            </div>
          </div>

          <div className="flex items-center gap-2 py-2">
            <input 
              type="checkbox"
              id="ativo"
              checked={formData.ativo}
              className="w-4 h-4 accent-[#3B82F6] cursor-pointer"
              onChange={e => setFormData({...formData, ativo: e.target.checked})}
            />
            <label htmlFor="ativo" className="text-[14px] font-semibold text-[#1F2937] dark:text-black-200 cursor-pointer">
              Produto Ativo
            </label>
          </div>

          <div>
            <label className="block text-[14px] font-semibold mb-1">Categoria *</label>
            <select 
              value={formData.categoria}
              className="w-full border border-[#E5E7EB] p-3 rounded-[8px] bg-white focus:ring-2 focus:ring-[#3B82F6] outline-none"
              onChange={e => setFormData({...formData, categoria: e.target.value})}
            >
              <option value="">Selecione...</option>
              <option value="Eletrônicos">Eletrônicos</option>
              <option value="Periféricos">Periféricos</option>
              <option value="Acessórios">Acessórios</option>
            </select>
            {erros.categoria && <p className="text-[#EF4444] text-xs mt-1">{erros.categoria}</p>}
          </div>

          <div>
            <label className="block text-[14px] font-semibold mb-1">URL da Imagem</label>
            <input 
              value={formData.imagemUrl}
              placeholder="https://..."
              className="w-full border border-[#E5E7EB] p-3 rounded-[8px] focus:ring-2 focus:ring-[#3B82F6] outline-none"
              onChange={e => setFormData({...formData, imagemUrl: e.target.value})}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="px-6 py-2 bg-gray-100 text-[#1F2937] rounded-[8px] font-semibold hover:bg-gray-200">Cancelar</button>
          <button 
            onClick={handleSalvar}
            className="px-6 py-2 bg-[#3B82F6] text-white rounded-[8px] font-semibold hover:bg-[#2563EB]"
          >
            ✓ {produtoInicial ? 'Atualizar Produto' : 'Salvar Produto'}
          </button>
        </div>
      </div>
    </div>
  );
}