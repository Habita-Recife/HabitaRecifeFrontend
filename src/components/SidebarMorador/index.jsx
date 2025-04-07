import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo04.png";
import { Search, Home, FileText, Wallet, Headphones, LogOut } from "lucide-react";

const SidebarMorador = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = (text) => {
    switch(text) {
      case "Início":
        navigate("/DashboardMorador");
        break;
      case "Solicitações":
        navigate("/SolicitacaoMorador");
        break;
      case "Controle Financeiro":
        navigate("/ControleMorador");
        break;
      case "Serviços":
        navigate("/ServicoMorador");
        break;
      default:
        console.log(`Botão ${text} clicado`);
    }
  };

  return (
    <div className="w-64 h-screen bg-[#2C3E50] shadow-md flex flex-col  p-4">
      <div className="flex flex-col items-center gap-4 mt-5">
        <img 
          src={logo} 
          alt="Logo" 
          className="w-40 h-32 cursor-pointer" 
          onClick={() => navegar("/DashboardMorador")} 
        />

        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-200 border-none outline-none"
            aria-label="Pesquisar"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-5">
        <SidebarButton icon={<Home size={18} />} text="Início" onClick={() => handleButtonClick("Início")} />
        <SidebarButton icon={<FileText size={18} />} text="Solicitações" onClick={() => handleButtonClick("Solicitações")} />
        <SidebarButton icon={<Wallet size={18} />} text="Controle Financeiro" onClick={() => handleButtonClick("Controle Financeiro")} />
        <SidebarButton icon={<Headphones size={18} />} text="Serviços" onClick={() => handleButtonClick("Serviços")} />
      </div>
    </div>
  );
};

const SidebarButton = ({ icon, text, onClick }) => {
  return (
    <button 
      className="flex items-center gap-3 p-3 rounded-lg bg-[#008080] text-white border-none w-full cursor-pointer transition-colors hover:bg-[#006666]" 
      onClick={onClick} 
      aria-label={text}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

SidebarButton.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default SidebarMorador;