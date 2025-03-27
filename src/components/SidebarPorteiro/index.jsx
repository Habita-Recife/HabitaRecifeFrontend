import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo04.png";
import { LogOut } from "lucide-react";

const SidebarPorteiro = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Usuário deslogado");
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-[#2C3E50] shadow-md flex flex-col justify-between p-4">
      <div className="flex flex-col items-center gap-4">
        <img src={logo} alt="Logo" className="w-40 h-32" />
    
      </div>

      
      <div className="flex-1"></div>

      {/* o sair ne, de cria*/}
      <button
        className="ml-40 flex items-center gap-2 text-gray-500 hover:text-red-500 bg-transparent border-none cursor-pointer transition-colors" 
        onClick={handleLogout}
        aria-label="Sair"
      >
        <LogOut size={20} />
      </button>
    </div>
  );
};

export default SidebarPorteiro;