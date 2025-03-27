import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo04.png";
import { Search, Home, Bell, User, Calendar, Headphones, Settings, LogOut } from "lucide-react"; // Changed MessageCircle to User

const SidebarSindi = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Usuário deslogado");
    navigate("/login");
  };

  const routes = {
    "Início": "/DashboardSindi",
    "Notificações": "/NotificacoesSindi",
    "Moradores": "/MoradoresSindi",
    "Reuniões": "/sindico/reunioes",
    "Serviços": "/sindico/servicos",
    "Manutenção": "/sindico/manutencao"
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="w-64 h-screen bg-[#2C3E50] shadow-md flex flex-col justify-between p-4">
      <div className="flex flex-col items-center gap-4">
        <img 
          src={logo} 
          alt="Logo" 
          className="w-40 h-32 cursor-pointer" 
          onClick={() => navigate("/sindico/dashboard")} 
        />
        <h1 className="text-lg font-bold text-white">HABITA RECIFE</h1>

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

      <div className="flex flex-col gap-4">
        {Object.entries(routes).map(([text, route]) => (
          <SidebarButton 
            key={text}
            icon={getIconComponent(text)} 
            text={text} 
            onClick={() => handleNavigation(route)} 
            isActive={window.location.pathname === route}
          />
        ))}
      </div>

      <button 
        className="ml-40 flex items-center gap-2 text-gray-500 hover:text-red-500 bg-transparent border-none cursor-pointer transition-colors" 
        onClick={handleLogout} 
        aria-label="Logout"
      >
        <LogOut size={20} />
      </button>
    </div>
  );
};

const getIconComponent = (text) => {
  const icons = {
    "Início": <Home size={18} />,
    "Notificações": <Bell size={18} />,
    "Moradores": <User size={18} />, // Changed from MessageCircle to User
    "Reuniões": <Calendar size={18} />,
    "Serviços": <Headphones size={18} />,
    "Manutenção": <Settings size={18} />
  };
  return icons[text];
};

const SidebarButton = ({ icon, text, onClick, isActive = false }) => {
  return (
    <button 
      className={`flex items-center gap-3 p-3 rounded-lg text-white border-none w-full cursor-pointer transition-colors hover:bg-[#006666] ${
        isActive ? "bg-[#008080] font-bold" : "bg-[#008080]/80 hover:bg-[#006666]"
      }`} 
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
  isActive: PropTypes.bool
};

export default SidebarSindi;