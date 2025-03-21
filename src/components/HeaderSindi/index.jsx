
import PropTypes from "prop-types"; 
import "./style.css"; 

const HeaderSindi = () => {
    const nome = "joana didi moco teste"; //lembrando que isso eh por enquanto q n tem backend..
    
    const cargo = "sindica";
  return (
    <header className="header">
      <h1 className="header-title">Solicitações</h1>
      <div className="header-info">
        <p className="header-name">{nome}</p>
        <p className="header-role">{cargo}</p>
      </div>
    </header>
  );
};


HeaderSindi.propTypes = {
  nome: PropTypes.string.isRequired, 
  cargo: PropTypes.string.isRequired, 
};

export default HeaderSindi;