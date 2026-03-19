import { useState } from 'react';
import api from '../services/api';

export function FormularioProduto({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '', // Estado para a descrição [cite: 64]
    preco: 0,
    estoque: 0,
    categoria: '',
    imagemUrl: ''
  });

  const [erros, setErros] = useState({});

  // Validações baseadas no Guia Visual [cite: 77]
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
      await api.post('/Produtos', formData);
      onSuccess();
    } catch (err) {
      alert("Erro ao salvar produto no banco .NET");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-[12px] p-[30px] w-full max-w-[500px] shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[24px] font-bold text-[#1F2937]">Novo Produto</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>

        <div className="space-y-4">
          {/* Nome do Produto */}
          <div>
            <label className="block text-[14px] font-semibold mb-1">Nome do Produto *</label>
            <input 
              placeholder="Ex: Notebook Gamer"
              className="w-full border border-[#E5E7EB] p-3 rounded-[8px] focus:ring-2 focus:ring-[#3B82F6] outline-none"
              onChange={e => setFormData({...formData, nome: e.target.value})}
            />
            {erros.nome && <p className="text-[#EF4444] text-xs mt-1">{erros.nome}</p>}
          </div>

          {/* Campo de Descrição Adicionado [cite: 64, 65] */}
          <div>
            <label className="block text-[14px] font-semibold mb-1">Descrição</label>
            <textarea 
              placeholder="Descreva o produto..."
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
                className="w-full border border-[#E5E7EB] p-3 rounded-[8px] focus:ring-2 focus:ring-[#3B82F6] outline-none"
                onChange={e => setFormData({...formData, preco: Number(e.target.value)})}
              />
              {erros.preco && <p className="text-[#EF4444] text-xs mt-1">{erros.preco}</p>}
            </div>
            <div className="flex-1">
              <label className="block text-[14px] font-semibold mb-1">Estoque *</label>
              <input 
                type="number"
                className="w-full border border-[#E5E7EB] p-3 rounded-[8px] focus:ring-2 focus:ring-[#3B82F6] outline-none"
                onChange={e => setFormData({...formData, estoque: Number(e.target.value)})}
              />
              {erros.estoque && <p className="text-[#EF4444] text-xs mt-1">{erros.estoque}</p>}
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-semibold mb-1">Categoria *</label>
            <select 
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

          {/* URL da Imagem [cite: 70, 71] */}
          <div>
            <label className="block text-[14px] font-semibold mb-1">URL da Imagem</label>
            <input 
              placeholder="https://..."
              className="w-full border border-[#E5E7EB] p-3 rounded-[8px] focus:ring-2 focus:ring-[#3B82F6] outline-none"
              onChange={e => setFormData({...formData, imagemUrl: e.target.value})}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 text-[#1F2937] rounded-[8px] font-semibold hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSalvar}
            className="px-6 py-2 bg-[#3B82F6] text-white rounded-[8px] font-semibold hover:bg-[#2563EB] transition-all"
          >
            ✓ Salvar Produto
          </button>
        </div>
      </div>
    </div>
  );
}