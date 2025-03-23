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
    <div className="flex justify-between items-center">
      
      <div className="bg-[#2C3E50] w-1/3 h-[79.6vh] p-8 flex flex-col items-center text-white shadow-md">
        <div className="flex flex-col items-center gap-2 mb-6">
          <h1 className="text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            Bem-vindo ao Habita Recife!
          </h1>
          <p className="text-white text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] max-w-2xl text-center">
            Gerencie seu condomínio de forma eficiente e prática. <br />
            Acompanhe avisos, notificações e novidades em um só lugar.
          </p>
        </div>
        <h2 className="mb-6 text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Login
        </h2>
        
        <form className="flex flex-col items-center w-full gap-y-4">
          
          <div className="w-4/5 flex flex-col">
            <label className="text-left">Email:</label>
            <InputComponent typeInput="email" placeholderText="Insira aqui seu email..." />
          </div>

          <div className="w-4/5 flex flex-col">
            <label className="text-left">Senha:</label>
            <InputComponent typeInput="password" placeholderText="Insira aqui sua senha..." />
            <button
              type="button"
              onClick={() => setOpenModalForgot(true)}
              className="text-sm text-gray-300 hover:text-white hover:underline transition-colors text-left mt-1"
            >
              Esqueceu a senha?
            </button>
          </div>

          <div className="flex flex-col items-center gap-1 w-full">
            <ButtonComponent 
              text="Entrar!" 
              type="submit"
              className="bg-black font-bold text-white rounded-xl py-2 hover:bg-gray-800 transition-all"
            />
            <p className="text-sm text-gray-300">
              Não tem conta?{" "}
              <button
                type="button"
                onClick={() => setOpenModal(true)}
                className="text-sm text-gray-300 hover:text-white hover:underline transition-colors"
              >
                Faça seu cadastro!
              </button>
            </p>
          </div>
        </form>

        <ModalCadastro isOpen={openModal} onClose={() => setOpenModal(false)} />
        <ModalForgot isOpen={openModalForgot} onClose={() => setOpenModalForgot(false)} />
      </div>

      <div 
        style={{ backgroundImage: `url(${backgroundImage})` }} 
        className="w-2/3 h-[79.6vh] bg-cover bg-no-repeat flex flex-col justify-between items-center text-center"
      >
        <div className="w-full flex justify-end p-8">
          <img src={logo} alt="Habita Recife Logo" className="w-60 h-40" />
        </div>

        <div className="w-3/4 h-3/5 flex justify-end pr-2">
          <img className="h-full" src={womanImage} alt="Mulher ilustrativa" />
        </div>
      </div>
    </div>
  );
};

export default HeroLogin;
