import { ChevronDown } from "lucide-react";

export default function HeaderPrefeitura() {
  return (
    <div className="w-full h-20 bg-[#2C3E50] flex items-center justify-end px-8 shadow-lg">
      
      <div className="flex items-center gap-4 cursor-pointer group">
        <div className="w-12 h-12 rounded-full bg-[#008080] flex items-center justify-center text-white font-bold text-xl group-hover:bg-white group-hover:text-[#008080] transition-colors duration-300 shadow-md">
          P
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold group-hover:text-[#008080] transition-colors duration-300">
            Prefeitura
          </span>
          <span className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300">
            Prefeitura do Recife
          </span>
        </div>
        <ChevronDown 
          size={18} 
          className="text-white opacity-70 group-hover:text-[#008080] transition-colors duration-300" 
        />
      </div>
    </div>
  );
}