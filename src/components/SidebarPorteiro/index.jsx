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

      
      <div className="mb-4">
        <button
          className="flex items-center justify-center gap-2 w-full p-3 rounded-lg text-gray-300 hover:bg-[#34495E] hover:text-white transition-colors"
          onClick={handleLogout}
          aria-label="Sair"
        >
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarPorteiro;