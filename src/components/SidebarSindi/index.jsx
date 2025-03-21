import { useState } from "react";
import PropTypes from "prop-types"; // lembrem de importar as props!!
import logo from "../../assets/logo04.png";
import "./style.css";
import { Search, Home, Bell, MessageCircle, Calendar, Headphones, Settings, LogOut } from "lucide-react";

const SidebarSindi = () => {
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    // esse botao ta sem logica, so serve pra debugar por enquanto...
    console.log("Usuário deslogado");
  };

  const handleButtonClick = (text) => {
    // aqui eh so pra debugar, depois vou fazer a logica de navegacao de paginas..
    console.log(`Botão ${text} clicado`);
  };

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">HABITA RECIFE</h1>

        <div className="search-container">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
            aria-label="Pesquisar"
          />
        </div>
      </div>

      <div className="menu">
        <SidebarButton icon={<Home size={18} />} text="Início" onClick={() => handleButtonClick("Início")} />
        <SidebarButton icon={<Bell size={18} />} text="Notificações" onClick={() => handleButtonClick("Notificações")} />
        <SidebarButton icon={<MessageCircle size={18} />} text="Comunicações" onClick={() => handleButtonClick("Comunicações")} />
        <SidebarButton icon={<Calendar size={18} />} text="Reuniões" onClick={() => handleButtonClick("Reuniões")} />
        <SidebarButton icon={<Headphones size={18} />} text="Serviços" onClick={() => handleButtonClick("Serviços")} />
        <SidebarButton icon={<Settings size={18} />} text="Manutenção" onClick={() => handleButtonClick("Manutenção")} />
      </div>

      <button className="logout-button" onClick={handleLogout} aria-label="Logout">
        <LogOut size={20} />
      </button>
    </div>
  );
};

const SidebarButton = ({ icon, text, onClick }) => {
  return (
    <button className="menu-button" onClick={onClick} aria-label={text}>
      {icon}
      <span>{text}</span>
    </button>
  );
};

// aprendi q tem que ficar validando essas props direto
SidebarButton.propTypes = {
  icon: PropTypes.element.isRequired, // obrigatorio o icone ser um elemento react
  text: PropTypes.string.isRequired, // aqui eh obrigtorio string
  onClick: PropTypes.func, // esse eh o unico que nao eh obrigatório
};

export default SidebarSindi;