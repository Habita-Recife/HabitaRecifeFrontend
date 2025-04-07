import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo04.png";
import { Search, Home, Bell, User, Calendar, Headphones, DollarSign, LogOut } from "lucide-react";

const SidebarSindi = () => {
  const [busca, setBusca] = useState("");
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const navegar = useNavigate();

  const rotas = {
    "Início": "/DashboardSindi",
    "Notificações": "/NotificacoesSindi",
    "Moradores": "/MoradoresSindi",
    "Reuniões": "/ReunioesSindi",
    "Serviços": "/ServiSindico",
    "Financeiro": "/FinanceiroSindi" 
  };

  const handleNavegacao = (rota) => {
    navegar(rota);
  };

  return (
    <div className="w-64 h-screen bg-[#2C3E50] shadow-md flex flex-col p-4">
      <div className="flex flex-col items-center gap-4 mt-5">
        <img 
          src={logo} 
          alt="Logo" 
          className="w-40 h-32 cursor-pointer" 
          onClick={() => navegar("/DashboardSindi")} 
        />

        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Pesquisar..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-200 border-none outline-none"
            aria-label="Pesquisar"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-5">
        {Object.entries(rotas).map(([texto, rota]) => (
          <BotaoSidebar 
            key={texto}
            icone={getIcone(texto)} 
            texto={texto} 
            onClick={() => handleNavegacao(rota)} 
            estaAtivo={window.location.pathname === rota}
          />
        ))}
      </div>
    </div>
  );
};

const getIcone = (texto) => {
  const icones = {
    "Início": <Home size={18} />,
    "Notificações": <Bell size={18} />,
    "Moradores": <User size={18} />,
    "Reuniões": <Calendar size={18} />,
    "Serviços": <Headphones size={18} />,
    "Financeiro": <DollarSign size={18} /> 
  };
  return icones[texto];
};

const BotaoSidebar = ({ icone, texto, onClick, estaAtivo = false }) => {
  return (
    <button 
      className={`flex items-center gap-3 p-3 rounded-lg text-white border-none w-full cursor-pointer transition-colors hover:bg-[#006666] ${
        estaAtivo ? "bg-[#008080] font-bold" : "bg-[#008080]/80 hover:bg-[#006666]"
      }`} 
      onClick={onClick} 
      aria-label={texto}
    >
      {icone}
      <span>{texto}</span>
    </button>
  );
};

BotaoSidebar.propTypes = {
  icone: PropTypes.element.isRequired,
  texto: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  estaAtivo: PropTypes.bool
};

export default SidebarSindi;