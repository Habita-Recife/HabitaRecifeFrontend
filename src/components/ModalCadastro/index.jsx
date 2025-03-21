import "../ModalCadastro/style.css";
import { useState } from "react";
import PropTypes from "prop-types"; // tive que importar esse props types pra ajudar nas validacoes is open e close
import ModalCadSucess from "../ModalCadSucess";

const ModalCadastro = ({ isOpen, onClose }) => {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // esses campos tem que ser validados pro usuario conseguir se cadastrar
    if (!email || !cpf || !password || !confirmPassword) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (cpf.length !== 11) {
      setError("O CPF deve conter exatamente 11 números.");
      return;
    }

    // depois de tudo validado, nao mostra erro, e muda o boleano do modal pra true, pra poder abrir o modal sucess!!
    setError("");
    setOpenModal(true);
  };

  // depois dessa errow func, se o cara confirmar todos os dados e fechar o modal sucess, todos os modais vao fechar
  const handleCloseSuccessModal = () => {
    setOpenModal(false); 
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Insira aqui seu email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Insira aqui seu CPF..."
            value={cpf}
            onChange={(e) => setCpf(e.target.value.replace(/\D/g, ""))}
            maxLength="11"
            pattern="[0-9]{11}"
            title="O CPF deve conter exatamente 11 números"
            inputMode="numeric"
            required
          />
          <input
            type="password"
            placeholder="Insira aqui sua senha..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Insira aqui sua senha novamente..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Cadastrar</button>
        </form>
        <button className="close-btn" onClick={onClose}>
          Fechar
        </button>
      </div>
      
      <ModalCadSucess isOpen={openModal} onClose={handleCloseSuccessModal} />
    </div>
  );
};

// essas sao as validacoes das props
ModalCadastro.propTypes = {
  isOpen: PropTypes.bool.isRequired, // o isOpen eh obrigatoriamente boleano
  onClose: PropTypes.func.isRequired, // o onclose tem q ser uma funcao..
};

export default ModalCadastro;