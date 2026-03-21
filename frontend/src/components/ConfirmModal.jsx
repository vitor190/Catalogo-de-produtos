import { AlertTriangle } from 'lucide-react'; 

export function ConfirmModal({ isOpen, onClose, onConfirm, productName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

     
      <div className="relative bg-white rounded-[16px] p-8 w-full max-w-[400px] shadow-2xl transform transition-all scale-100 border border-gray-100">
        <div className="flex flex-col items-center text-center">
          
          
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="text-[#EF4444] w-8 h-8" />
          </div>

          <h2 className="text-[20px] font-bold text-[#1F2937] mb-2">
            Excluir Produto?
          </h2>
          
          <p className="text-[#6B7280] text-[15px] leading-relaxed mb-8">
            Você tem certeza que deseja remover <span className="font-bold text-[#1F2937]">"{productName}"</span>? 
            Esta ação é permanente e não poderá ser desfeita.
          </p>

          <div className="flex flex-col w-full gap-3">
            
            <button 
              onClick={onConfirm}
              className="w-full py-3 bg-[#EF4444] text-white font-bold rounded-[10px] hover:bg-[#DC2626] transition-all shadow-md active:scale-95"
            >
              Sim, excluir produto
            </button>

            <button 
              onClick={onClose}
              className="w-full py-3 bg-gray-50 text-[#4B5563] font-semibold rounded-[10px] hover:bg-gray-100 transition-all border border-gray-200"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}