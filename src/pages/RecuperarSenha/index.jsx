import { useState } from "react";
import { X, Lock, CheckCircle, ArrowLeft } from "lucide-react";
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { useNavigate } from "react-router-dom";

const checkmarkStyle = `
@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #4CAF50;
  fill: none;
  animation: draw 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  margin: 0 auto 20px;
  box-shadow: inset 0px 0px 0px #4CAF50;
  animation: fill 0.4s ease-in-out 0.4s forwards;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: draw 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #4CAF50;
  }
}
`;

export function RecuperarSenha() {
  const [formData, setFormData] = useState({
    novaSenha: "",
    confirmarSenha: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validações básicas
    if (!formData.novaSenha || !formData.confirmarSenha) {
      setError("Preencha todos os campos");
      setIsLoading(false);
      return;
    }

    if (formData.novaSenha.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      setIsLoading(false);
      return;
    }

    if (formData.novaSenha !== formData.confirmarSenha) {
      setError("As senhas não coincidem");
      setIsLoading(false);
      return;
    }

    // Simulação de request kkk
    setTimeout(() => {
      setError("");
      setShowSuccessModal(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#2C3E50] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#3E4E5F] rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <button 
              onClick={handleBackToLogin}
              className="flex items-center text-gray-300 hover:text-white mb-4"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Voltar para login
            </button>

            <div className="text-center mb-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#4E5D6C] mb-4">
                <Lock className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Redefinir Senha</h2>
              <p className="text-gray-300 mb-2">
                Crie uma nova senha para sua conta
              </p>
              <p className="text-red-500 shadow-sm animate-pulse">
                Se você estiver logado, será desconectado e redirecionado para a página de login.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nova Senha
                </label>
                <InputComponent
                  typeInput="password"
                  name="novaSenha"
                  placeholderText="Digite sua nova senha"
                  value={formData.novaSenha}
                  onChange={handleChange}
                  required
                  showEyeIcon={true}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirmar Nova Senha
                </label>
                <InputComponent
                  typeInput="password"
                  name="confirmarSenha"
                  placeholderText="Repita a nova senha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  required
                  showEyeIcon={true}
                />
                {formData.novaSenha && formData.confirmarSenha && formData.novaSenha !== formData.confirmarSenha && (
                  <p className="mt-1 text-sm text-red-400">As senhas não coincidem</p>
                )}
              </div>

              {error && (
                <p className="text-red-400 text-sm">
                  {error}
                </p>
              )}
              
              <ButtonComponent
                text={isLoading ? "Redefinindo..." : "Redefinir Senha"}
                type="submit"
                disabled={isLoading}
                className="w-full"
              />
            </form>
          </div>
        </div>
      </div>

      {/* Adicione o modal aqui com uma funcao pra voltar ao login caso tenha sucesso */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <style>{checkmarkStyle}</style>
          
          <div className="bg-[#2C3E50] p-6 rounded-lg shadow-xl w-full max-w-md relative">
            <div className="text-center mb-6">
              <svg className="checkmark" viewBox="0 0 52 52">
                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
              
              <h2 className="text-2xl font-bold text-white mb-2">Senha Redefinida!</h2>
              <p className="text-green-500 shadow-sm animate-pulse text-sm mb-6">
                Sua senha foi alterada com sucesso. Agora você pode fazer login com sua nova senha.
              </p>
            </div>

            <div className="flex justify-center">
              <ButtonComponent
                text="Voltar para Login"
                onClick={handleBackToLogin}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}