import { useState } from "react";
import { X } from "lucide-react";
import ButtonComponent from "../ButtonComponent";
import InputComponent from "../InputComponent";
import ModalForgotSuccess from "../ModalForgotSuccess";
import { forgotPassword } from "../../utils/api";

const ModalForgot = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      await forgotPassword(email);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Erro ao enviar email:", error);
    
      if (error.response) {
        if (error.response.status === 404) {
          setError("Email não encontrado. Verifique se digitou corretamente.");
        } else {
          setError(error.response.data || "Ocorreu um erro ao processar sua solicitação.");
        }
      } else {
        setError("Não foi possível conectar ao servidor. Verifique sua conexão.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#2C3E50] p-6 rounded-lg shadow-xl w-full max-w-md relative">
          <button
            onClick={() => {
              setEmail("");
              setError("");
              onClose();
            }}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Redefinir Senha</h2>
            <p className="text-gray-300 text-sm">
              Enviaremos um link seguro para redefinir sua senha no email cadastrado
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email cadastrado:
              </label>
              <InputComponent
                typeInput="email"
                placeholderText="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="mt-1">
                <div className="flex items-center bg-white p-2 rounded shadow border border-gray-300">
                  <div className="flex-shrink-0 w-5 h-5 bg-orange-500 rounded-sm flex items-center justify-center mr-2">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <p className="text-xs text-black">
                    {error}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <ButtonComponent
                text={isLoading ? "Enviando..." : "Enviar Link"}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => {
                  setEmail("");
                  setError("");
                  onClose();
                }}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Voltar para login
              </button>
            </div>
          </form>
        </div>
      </div>

      <ModalForgotSuccess
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          setEmail("");
          onClose();
        }}
        email={email}
      />
    </>
  );
};

export default ModalForgot;
