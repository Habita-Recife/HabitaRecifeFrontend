import { Bell, MessageCircle, Calendar, ChevronDown } from "lucide-react";

const HeaderMorador = () => {
  return (
    <div className="w-full h-20 bg-[#2C3E50] flex items-center justify-between px-8 shadow-lg">
      <div className="flex items-center gap-10">
        <button className="flex items-center gap-2 text-white hover:text-[#008080] transition-colors duration-300 group">
          <div className="p-2 bg-[#008080] rounded-full group-hover:bg-white transition-colors duration-300">
            <Bell size={18} className="group-hover:text-[#008080]" />
          </div>
          <span className="font-medium">Notificações</span>
          <ChevronDown size={16} className="opacity-70" />
        </button>

        <button className="flex items-center gap-2 text-white hover:text-[#008080] transition-colors duration-300 group">
          <div className="p-2 bg-[#008080] rounded-full group-hover:bg-white transition-colors duration-300">
            <MessageCircle size={18} className="group-hover:text-[#008080]" />
          </div>
          <span className="font-medium">Comunicações</span>
        </button>

        <button className="flex items-center gap-2 text-white hover:text-[#008080] transition-colors duration-300 group">
          <div className="p-2 bg-[#008080] rounded-full group-hover:bg-white transition-colors duration-300">
            <Calendar size={18} className="group-hover:text-[#008080]" />
          </div>
          <span className="font-medium">Reuniões</span>
        </button>
      </div>

      <div className="flex items-center gap-4 cursor-pointer group">
        <div className="w-12 h-12 rounded-full bg-[#008080] flex items-center justify-center text-white font-bold text-xl group-hover:bg-white group-hover:text-[#008080] transition-colors duration-300 shadow-md">
          J
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold group-hover:text-[#008080] transition-colors duration-300">João Silva</span>
          <span className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300">Morador</span>
        </div>
        <ChevronDown size={18} className="text-white opacity-70 group-hover:text-[#008080] transition-colors duration-300" />
      </div>
    </div>
  );
};

export default HeaderMorador;