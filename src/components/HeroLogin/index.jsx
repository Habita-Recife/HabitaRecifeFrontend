import { useState } from "react";
import womanImage from "../../assets/Womanimage.png";
import logo from "../../assets/logo04.png";
import ModalCadastro from "../ModalCadastro";
import ModalForgot from "../ModalForgot";
import InputComponent from "../InputComponent";
import ButtonComponent from "../ButtonComponent";
import backgroundImage from "../../assets/BackgroundPaginaLogin.png";

const HeroLogin = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalForgot, setOpenModalForgot] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="bg-[#2C3E50] w-full lg:w-1/3 h-screen lg:h-screen p-4 sm:p-8 flex flex-col items-center text-white shadow-md relative">
        <div className="flex flex-col items-center gap-2 mb-4 sm:mb-6">
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
        
        <form className="flex flex-col items-center w-full gap-y-3 sm:gap-y-4">
          <div className="w-full sm:w-4/5 flex flex-col">
            <label className="text-left text-sm sm:text-base">Email:</label>
            <InputComponent typeInput="email" placeholderText="Insira aqui seu email..." />
          </div>

          <div className="w-full sm:w-4/5 flex flex-col">
            <label className="text-left text-sm sm:text-base">Senha:</label>
            <InputComponent typeInput="password" placeholderText="Insira aqui sua senha..." />
            <button
              type="button"
              onClick={() => setOpenModalForgot(true)}
              className="text-xs sm:text-sm text-[#008080] hover:text-[#00A0A0] hover:underline transition-colors text-left mt-1"
            >
              Esqueceu a senha?
            </button>
          </div>

          <div className="flex flex-col items-center gap-1 w-full">
            <ButtonComponent 
              text="Entrar" 
              type="submit"
             
            />
            <p className="text-xs sm:text-sm text-gray-300">
              Não tem conta?{" "}
              <button
                type="button"
                onClick={() => setOpenModal(true)}
                className="text-xs sm:text-sm text-[#008080] hover:text-[#00A0A0] font-medium hover:underline transition-colors"
              >
                Faça seu cadastro!
              </button>
            </p>
          </div>
        </form>

        <ModalCadastro isOpen={openModal} onClose={() => setOpenModal(false)} />
        <ModalForgot isOpen={openModalForgot} onClose={() => setOpenModalForgot(false)} />

        <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40">
          <img className="w-full h-full object-contain" src={womanImage} alt="Mulher ilustrativa" />
        </div>
      </div>

      <div 
        style={{ backgroundImage: `url(${backgroundImage})` }} 
        className="hidden lg:block w-full lg:w-2/3 h-screen bg-cover bg-no-repeat flex flex-col justify-between items-center text-center"
      >
        <div className="w-full flex justify-end p-4 sm:p-8">
          <img src={logo} alt="Habita Recife Logo" className="w-40 sm:w-60 h-32 sm:h-40" />
        </div>
      </div>
    </div>
  );
};

export default HeroLogin;