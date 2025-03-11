import "../ModalCadastro/style.css";

const ModalCadastro = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Cadastro</h2>
        <form>
          <input type="email" placeholder="Insira aqui seu email..." />
          <input type="email" placeholder="Insira aqui seu email..." />
          <input type="text" placeholder="Insira aqui seu CPF..." />
          <input type="password" placeholder="Insira aqui sua senha..." />
          <input type="password" placeholder="Insira aqui sua senha..." />
          <button type="submit">Cadastrar</button>
        </form>
        <button className="close-btn" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default ModalCadastro;