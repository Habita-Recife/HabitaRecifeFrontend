import { useState } from "react";
import { X } from "lucide-react";
import ButtonComponent from "../ButtonComponent";
import InputComponent from "../InputComponent";

const ModalForgotSuccess = ({ isOpen, onClose, email }) => {
  const [code, setCode] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // ainda ta sem logica de verificacao de codigo kkkk
    console.log("Código enviado:", code);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2C3E50] p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Verificação de Email</h2>
          <p className="text-gray-300 text-sm">
            Enviamos um código de verificação para:
            <br />
            <span className="font-semibold text-white">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Digite o código de 6 dígitos:
            </label>
            <InputComponent
              typeInput="text"
              placeholderText="000000"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              maxLength="6"
            />
          </div>

          <div className="flex flex-col gap-2">
            <ButtonComponent
              text="Verificar Código"
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors"
            />
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForgotSuccess; 