import { useState } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import ModalCadSucess from "../ModalCadSucess";
import InputComponent from "../InputComponent";
import ButtonComponent from "../ButtonComponent";
import { cadastrarUsuario } from "../../utils/api";


const ModalCadastro = ({ isOpen, onClose }) => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "MORADOR"
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [senhaInvalida, setSenhaInvalida] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === "password") {
      const senhaValida = value &&
        value.length >= 8 &&
        value.match(/[A-Za-z]/) &&
        value.match(/[0-9]/);
      setSenhaInvalida(value !== "" && !senhaValida);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    let errors = [];

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      errors.push("Todos os campos são obrigatórios.");
    }

    if (formData.password !== formData.confirmPassword) {
      errors.push("As senhas não coincidem.");
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
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        roles: [formData.role]
      };

      await cadastrarUsuario(userData);

      setError("");
      setOpenModal(true);
    } catch (error) {
      console.error("Erro no cadastro:", error);

      if (error.response) {
        if (error.response.status === 404 ||
          error.response.status === 400 ||
          error.response.data?.message?.toLowerCase().includes("email") ||
          error.response.data?.message?.toLowerCase().includes("não encontrado") ||
          error.response.data?.message?.toLowerCase().includes("não cadastrado")) {

          setError("Email não pré-cadastrado no sistema. Por favor, entre em contato com o síndico do seu condomínio.");
        } else {
          setError(error.response.data?.message || "Ocorreu um erro durante o cadastro.");
        }
      } else {
        setError("Ocorreu um erro durante o cadastro. Verifique sua conexão e tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setOpenModal(false);
    onClose();
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "MORADOR"
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
            <h2 className="text-2xl font-bold text-white mb-2">Registre-se</h2>
            <p className="text-gray-300 text-sm">
              Preencha os campos abaixo para <span className="text-[#95dfdf]">ativar sua conta</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Apelido:
              </label>
              <InputComponent
                typeInput="text"
                name="username"
                placeholderText=" Digite um apelido"
                value={formData.username}
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
                placeholderText=" Digite o email fornecido para cadastro"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Senha:
              </label>
              <div className="relative">
                <InputComponent
                  typeInput="password"
                  name="password"
                  placeholderText=" Crie sua senha"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  showEyeIcon={true}
                />
                {senhaInvalida && (
                  <div className="mt-1">
                    <div className="flex items-center bg-white p-2 rounded shadow border border-gray-300">
                      <div className="flex-shrink-0 w-5 h-5 bg-orange-500 rounded-sm flex items-center justify-center mr-2">
                        <span className="text-white text-xs font-bold">!</span>
                      </div>
                      <p className="text-xs text-black">
                        A senha deve possuir pelo menos 8 caracteres, incluir letras e números.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirmar Senha:
              </label>
              <InputComponent
                typeInput="password"
                name="confirmPassword"
                placeholderText=" Repita sua senha"
                value={formData.confirmPassword}
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
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-[#3E4E5F] border border-[#4E5D6C] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              >
                <option value="MORADOR">Morador</option>
                <option value="PORTEIRO">Porteiro</option>
                <option value="SINDICO">Síndico</option>
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
