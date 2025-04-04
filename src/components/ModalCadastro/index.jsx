import { useState } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import ModalCadSucess from "../ModalCadSucess";
import InputComponent from "../InputComponent";
import ButtonComponent from "../ButtonComponent";

const ModalCadastro = ({ isOpen, onClose }) => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    tipoUsuario: "morador"
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    let errors = [];
    
    if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha) {
      errors.push("Todos os campos são obrigatórios.");
    }

    if (formData.senha !== formData.confirmarSenha) {
      errors.push("As senhas não coincidem.");
    }

    if (formData.senha.length < 6) {
      errors.push("A senha deve ter pelo menos 6 caracteres.");
    }

    if (!formData.email.includes("@")) {
      errors.push("Email inválido.");
    }

    if (errors.length > 0) {
      setError(errors.join(" "));
      setIsLoading(false);
      return;  
    }

    try {
      // nessa parte entraria a api, que ainda nao faco ideia de como receber os dados
      await new Promise(resolve => setTimeout(resolve, 1000));
      setError("");
      setOpenModal(true);
    } catch (error) {
      console.error("Erro no cadastro:", error);
      setError("Ocorreu um erro durante o cadastro.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setOpenModal(false);
    onClose();
    setFormData({
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
      tipoUsuario: "morador"
    });
  };

  if (!isOpen) return null;

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
            <h2 className="text-2xl font-bold text-white mb-2">Cadastro</h2>
            <p className="text-gray-300 text-sm">
              Preencha os campos abaixo para <span className="text-[#95dfdf]">ativar sua conta</span>

            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nome Completo:
              </label>
              <InputComponent
                typeInput="text"
                name="nome"
                placeholderText="Digite seu nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email:
              </label>
              <InputComponent
                typeInput="email"
                name="email"
                placeholderText="Digite seu e-mail"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Senha:
              </label>
              <InputComponent
                typeInput="password"
                name="senha"
                placeholderText="Crie sua senha"
                value={formData.senha}
                onChange={handleChange}
                required
                showEyeIcon={true}
              />
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirmar Senha:
              </label>
              <InputComponent
                typeInput="password"
                name="confirmarSenha"
                placeholderText="Repita sua senha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                required
                showEyeIcon={true}
              />
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipo de Usuário:
              </label>
              <select
                name="tipoUsuario"
                value={formData.tipoUsuario}
                onChange={handleChange}
                className="w-full bg-[#3E4E5F] border border-[#4E5D6C] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              >
                <option value="morador">Morador</option>
                <option value="sindico">Síndico</option>
                <option value="porteiro">Porteiro</option>
              </select>
            </div>

            {error && (
              <p className="text-red-400 text-sm mt-2">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-2 pt-2">
              <ButtonComponent
                text={isLoading ? "Cadastrando..." : "Cadastrar"}
                type="submit"
                
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={onClose}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Voltar para login
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <ModalCadSucess 
        isOpen={openModal} 
        onClose={handleCloseSuccessModal} 
      />
    </>
  );
};

ModalCadastro.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalCadastro;