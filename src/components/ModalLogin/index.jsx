import { useState } from "react";
import PropTypes from "prop-types";
import InputComponent from "../InputComponent";
import ButtonComponent from "../ButtonComponent";

const ModalLogin = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    // Aqui você pode adicionar a lógica de autenticação
    console.log("Login:", { email, password });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2c3e50] p-6 rounded-lg w-[400px] text-center text-white shadow-xl animate-fadeIn">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputComponent
            typeInput="email"
            placeholderText="Insira aqui seu email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputComponent
            typeInput="password"
            placeholderText="Insira aqui sua senha..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <ButtonComponent text="Entrar" type="submit" className="w-full py-2" />
        </form>
        <ButtonComponent text="Fechar" onClick={onClose} className="w-full mt-4 py-2" />
      </div>
    </div>
  );
};

ModalLogin.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalLogin; 