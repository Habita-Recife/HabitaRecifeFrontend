import { Bell, MessageCircle, Calendar } from "lucide-react";

const HeaderMorador = () => {
  return (
    <div className="w-full h-16 bg-[#2C3E50] flex items-center justify-between px-8">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Bell className="text-white" size={20} />
          <span className="text-white">Notificações</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageCircle className="text-white" size={20} />
          <span className="text-white">Comunicações</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="text-white" size={20} />
          <span className="text-white">Reuniões</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#008080] flex items-center justify-center">
          <span className="text-white font-bold">J</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold">João Silva</span>
          <span className="text-gray-300 text-sm">Morador</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderMorador;
