import { useState } from "react";
import { X } from "lucide-react";
import ButtonComponent from "../ButtonComponent";
import InputComponent from "../InputComponent";
import ModalForgotSuccess from "../ModalForgotSuccess";

const ModalForgot = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#2C3E50] p-6 rounded-lg shadow-xl w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Recuperar Senha</h2>
            <p className="text-gray-300 text-sm">
              Digite seu email para receber um código de verificação
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email:
              </label>
              <InputComponent
                typeInput="email"
                placeholderText="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <ButtonComponent
                text="Enviar Código"
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

      <ModalForgotSuccess
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          onClose();
        }}
        email={email}
      />
    </>
  );
};

export default ModalForgot;
