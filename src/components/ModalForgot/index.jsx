import { useState } from "react";
import PropTypes from "prop-types";
import InputComponent from "../InputComponent";
import ButtonComponent from "../ButtonComponent";

const ModalForgot = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!email) {
      setError("O campo de email é obrigatório.");
      return;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Recuperar Senha</h2>
        <form onSubmit={handleSubmit}>
          <InputComponent
            typeInput="email"
            placeholderText="Insira aqui seu email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <ButtonComponent text="Enviar" type="submit" />
        </form>
        <ButtonComponent text="Fechar" onClick={onClose} />
      </div>
    </div>
  );
};

ModalForgot.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalForgot;
