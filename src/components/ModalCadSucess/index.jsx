import PropTypes from "prop-types";
import ButtonComponent from "../ButtonComponent";
import { CheckCircle } from "lucide-react";

const ModalCadSucess = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2c3e50] p-6 rounded-lg w-[400px] text-center text-white shadow-xl animate-fadeIn">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold mb-6">Cadastro Realizado com Sucesso!</h2>
        <p className="text-lg mb-6">Seu cadastro foi realizado com sucesso. Agora você pode fazer login.</p>
        <ButtonComponent text="Fechar" onClick={onClose} className="w-full py-2" />
      </div>
    </div>
  );
};

ModalCadSucess.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalCadSucess;