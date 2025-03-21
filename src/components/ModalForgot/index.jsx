import "../ModalForgot/style.css";
import { useState } from "react";

const ModalForgot = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    setSuccess(true);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Esqueci a Senha</h2>
        {success ? (
          <p>Um e-mail de recuperação foi enviado para {email}.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Digite seu e-mail..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Enviar</button>
          </form>
        )}
        <button className="close-btn" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default ModalForgot;
