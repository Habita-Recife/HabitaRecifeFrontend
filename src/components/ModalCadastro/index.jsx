import "../ModalCadastro/style.css";
import { useState } from "react";
import PropTypes from "prop-types";
import ModalCadSucess from "../ModalCadSucess";
import InputComponent from "../InputComponent";
import ButtonComponent from "../ButtonComponent";

const ModalCadastro = ({ isOpen, onClose }) => {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleCpfChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    
    if (numericValue.length <= 11) {
      setCpf(numericValue);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let errors = [];
    
    // Validações
    if (!email || !cpf || !password || !confirmPassword || !name) {
      errors.push("Todos os campos são obrigatórios.");
    }

    if (password !== confirmPassword) {
      errors.push("As senhas não coincidem.");
    }

    if (cpf.length !== 11) {
      errors.push("O CPF deve conter exatamente 11 números.");
    }

    if (errors.length > 0) {
      setError(errors.join(" "));
      return;  
    }

    setError("");  
    console.log("Abrindo modal de sucesso...");
    setOpenModal(true);
    console.log("Estado openModal:", openModal);
  };

  const handleCloseSuccessModal = () => {
    setOpenModal(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Cadastro</h2>
          <form onSubmit={handleSubmit}>
            <InputComponent
              typeInput="email"
              placeholderText="Insira aqui seu email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <InputComponent
              typeInput="text"
              placeholderText="Insira aqui seu CPF..."
              value={cpf}
              onChange={handleCpfChange}
              inputMode="numeric"
              maxLength="11"
              required
            />
            <InputComponent
              typeInput="text"
              placeholderText="Insira aqui seu nome..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <InputComponent
              typeInput="password"
              placeholderText="Insira aqui sua senha..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              showEyeIcon={false}
            />
            <InputComponent
              typeInput="password"
              placeholderText="Insira aqui sua senha novamente..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              showEyeIcon={false}
            />
            {error && <p className="error-message">{error}</p>}
            <ButtonComponent text="Cadastrar" type="submit" />
          </form>
          <ButtonComponent text="Fechar" onClick={onClose} />
        </div>
      </div>
      
      <ModalCadSucess isOpen={openModal} onClose={handleCloseSuccessModal} />
    </>
  );
};

ModalCadastro.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalCadastro;
