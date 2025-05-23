import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import ButtonComponent from "../ButtonComponent";

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

export default function CadMoradorSucessSindi({ isOpen, onClose }) {
  const [showCheckmark, setShowCheckmark] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowCheckmark(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <style>{checkmarkStyle}</style>
      
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          {showCheckmark && (
            <svg className="checkmark" viewBox="0 0 52 52">
              <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
              <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          )}
          
          <h2 className="text-2xl font-bold text-white mb-2">Morador Cadastrado com Sucesso!</h2>
          <p className="text-gray-300 text-sm mb-6">
            O morador foi cadastrado com sucesso no sistema e já pode acessar todas as funcionalidades.
          </p>
        </div>

        <div className="flex justify-center">
          <ButtonComponent
            text="OK"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
}

CadMoradorSucessSindi.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};