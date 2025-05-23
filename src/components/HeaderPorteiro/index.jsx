import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Lock, ChevronDown } from "lucide-react";
import logo from "../../assets/logo05.png";
import { converterRoles, getDados } from '../../utils/utils';
import { useAuth } from "../../contexts/AuthContext";

const HeaderPorteiro = () => {
  const { user, logOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logOut();
    navigate("/login");
  };

  const handleChangePassword = () => {
    navigate("/RecuperarSenha");
  };

  return (
    <div className="w-full h-20 bg-[#2C3E50] flex items-center justify-between px-8 shadow-lg">
      <div className="flex items-center gap-10 justify-center">
          <div className="flex flex-col items-center gap-3">
            <img src={logo} alt="Logo" className="w-35   h-14" />
          </div>
      </div>

      <div 
        className="flex items-center gap-4 cursor-pointer group relative"
        onClick={toggleDropdown}
        ref={dropdownRef}
      >
        <div className="w-12 h-12 rounded-full bg-[#008080] flex items-center justify-center text-white font-bold text-xl group-hover:bg-white group-hover:text-[#008080] transition-colors duration-300 shadow-md">
          {user.username?.charAt(0).toUpperCase() || ''}
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold group-hover:text-[#008080] transition-colors duration-300">
            {user.username?.toUpperCase() || ''}
          </span>
          <span className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300">
            {converterRoles(user?.roles?.[0] || '')}
          </span>
        </div>
        <ChevronDown 
          size={18} 
          className={`text-white opacity-70 group-hover:text-[#008080] transition-all duration-300 ${
            isDropdownOpen ? "transform rotate-180" : ""
          }`} 
        />

        {isDropdownOpen && (
          <div className="absolute top-16 right-0 w-64 bg-white rounded-lg shadow-xl z-50 overflow-hidden border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#008080] flex items-center justify-center text-white font-bold">
                  {user.username?.charAt(0).toUpperCase() || ''}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{user.username?.toUpperCase() || ''}</p>
                  <p className="text-sm text-gray-500">{user?.sub || ''}</p>
                </div>
              </div>
            </div>

            <div className="py-1">
              <button 
                onClick={handleChangePassword}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
              >
                <Lock size={16} className="mr-3 text-gray-500" />
                Alterar Senha
              </button>
            </div>

            <div className="border-t border-gray-200">
              <button 
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} className="mr-3" />
                Sair
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderPorteiro;