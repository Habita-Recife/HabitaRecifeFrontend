import { getDados } from '../../utils/utils';
import { useState } from "react";
import womanImage from "../../assets/Womanimage.png";
import logo from "../../assets/logo04.png";
import logoSemNome from "../../assets/logo06.png";
import ModalForgot from "../ModalForgot";
import InputComponent from "../InputComponent";
import ButtonComponent from "../ButtonComponent";
import backgroundImage from "../../assets/BackgroundPaginaLogin.png";
import ModalCadastro from "../ModalCadastro";
import { loginUser } from "../../utils/api";
import { useNavigate } from "react-router";



const HeroLogin = () => {
  const [openModalForgot, setOpenModalForgot] = useState(false);
  const [openModalCadastro, setOpenModalCadastro] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await loginUser(email, password);

      if (response && response.token) {
        const token = localStorage.getItem('token');
        const userData = getDados(token);

        if (userData.roles.includes('ROLE_SINDICO')) {
          navigate('/DashboardSindi');
        } else if (userData.roles.includes('ROLE_PORTEIRO')) {
          navigate('/DashboardPorteiro');
        } else if (userData.roles.includes('ROLE_MORADOR')) {
          navigate('/DashboardMorador');
        } else if (userData.roles.includes('ROLE_PREFEITURA')) {
          navigate('/DashboardPrefeitura');
        } else {
          navigate('/Dashboard');
        }
      } else {
        setError("Credenciais inválidas. Verifique seu email e senha.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setError("Falha no login. Verifique suas credenciais.");
    }
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen">

      <div className="bg-[#2C3E50] w-full lg:w-1/2 h-screen p-4 sm:p-8 flex flex-col items-center text-white shadow-md relative z-0">
        <div className="flex flex-col items-center gap-2 mb-4 sm:mb-6">
          <img
            src={logoSemNome}
            alt="Habita Recife Logo"
            className="w-30 sm:w-25 h-18 sm:h-40 drop-shadow-lg"
          />
          <h1 className="text-xl sm:text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] text-center">
            Bem-vindo ao <span className="text-[#008080]">Habita Recife</span>!
          </h1>
          <p className="text-white text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] max-w-2xl text-center">
            Gerencie seu condomínio de forma eficiente e prática. <br className="hidden sm:block" />
            Acompanhe avisos, notificações e novidades em um só lugar.
          </p>
        </div>

        <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold text-white">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full gap-y-3 sm:gap-y-4">
          <div className="w-full sm:w-4/5 flex flex-col">
            <label className="text-left text-sm sm:text-base">Email:</label>
            <InputComponent
              typeInput="email"
              placeholderText="Insira aqui seu email."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="w-full sm:w-4/5 flex flex-col">
            <label className="text-left text-sm sm:text-base">Senha:</label>
            <InputComponent
              typeInput="password"
              placeholderText="Insira aqui sua senha."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setOpenModalForgot(true)}
              className="text-xs sm:text-sm text-[#008080] hover:text-[#00A0A0] hover:underline transition-colors text-left mt-1"
            >
              Esqueceu a senha?
            </button>
          </div>

          {error && (
            <div className="w-full sm:w-4/5">
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

          <div className="flex flex-col items-center w-full mt-4">
            <ButtonComponent
              text="Entrar"
              type="submit"
              className="w-full sm:w-4/5"
              disabled={!email || !password}
            />

            <p className="text-xs sm:text-sm text-gray-300 mt-4">
              Foi cadastrado?{' '}
              <button
                type="button"
                onClick={() => setOpenModalCadastro(true)}
                className="text-[#008080] hover:text-[#00A0A0] font-medium hover:underline transition-colors"
              >
                Ative sua conta!
              </button>
            </p>
          </div>
        </form>
      </div>


      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: "brightness(0.85)"
        }}
        className="hidden lg:block w-full lg:w-2/3 h-screen bg-cover bg-no-repeat bg-center relative z-0"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 w-full flex justify-end p-4 sm:p-8">
          <img
            src={logo}
            alt="Habita Recife Logo"
            className="w-40 sm:w-60 h-32 sm:h-40 drop-shadow-lg"
          />
        </div>
      </div>


      <ModalForgot
        isOpen={openModalForgot}
        onClose={() => setOpenModalForgot(false)}
      />

      <ModalCadastro
        isOpen={openModalCadastro}
        onClose={() => setOpenModalCadastro(false)}
      />
    </div>
  );
};

export default HeroLogin;