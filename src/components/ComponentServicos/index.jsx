import { ChefHat, Star, Phone, MapPin, MoreVertical, Search, Filter, ChevronDown,
  Hammer, Wrench, SquareStack, X, Clock8 } from 'lucide-react';
import { useState } from 'react';

const ComponentServicos = () => {
 const [filtroDisponibilidade, setFiltroDisponibilidade] = useState('todos');
 const [mostrarFiltros, setMostrarFiltros] = useState(false);
 const [modalAberto, setModalAberto] = useState(false);
 const [servicoContratado, setServicoContratado] = useState('');
 
 const servicos = [
   {
     id: 1,
     nome: "Karla Andrade",
     bloco: "Bloco 11, Apt 202",
     profissao: "Cozinheira Chef",
     telefone: "(81) 9 0000-0000",
     nota: 4.5,
     icone: ChefHat,
     disponivel: true,
     PublicadoEm: new Date().toLocaleDateString('pt-BR')

   },
   {
     id: 2,
     nome: "Marcos Silva",
     bloco: "Bloco 5, Apt 301",
     profissao: "Encanador",
     telefone: "(81) 9 1111-1111",
     nota: 4.2,
     icone: Wrench,
     disponivel: false,
     PublicadoEm: new Date().toLocaleDateString('pt-BR')
   },
   {
     id: 3,
     nome: "Ana Costa",
     bloco: "Bloco 8, Apt 105",
     profissao: "Diarista",
     telefone: "(81) 9 2222-2222",
     nota: 4.8,
     icone: ChefHat,
     disponivel: true,
     PublicadoEm: new Date().toLocaleDateString('pt-BR')
   },
   {
     id: 4,
     nome: "João Oliveira",
     bloco: "Bloco 3, Apt 401",
     profissao: "Pedreiro",
     telefone: "(81) 9 3333-3333",
     nota: 4.0,
     icone: Hammer,
     disponivel: true,
     PublicadoEm: new Date().toLocaleDateString('pt-BR')
   },
   {
     id: 5,
     nome: "Carlos Mendes",
     bloco: "Bloco 7, Apt 102",
     profissao: "Marceneiro",
     telefone: "(81) 9 4444-4444",
     nota: 4.7,
     icone: SquareStack,
     disponivel: true,
     PublicadoEm: 'Faz eh tempo kkk'
   },
   {
     id: 6,
     nome: "Roberto Alves",
     bloco: "Bloco 2, Apt 303",
     profissao: "Encanador",
     telefone: "(81) 9 5555-5555",
     nota: 4.3,
     icone: Wrench,
     disponivel: false,
     PublicadoEm: '1950-01-01'
   }
 ];

 const servicosFiltrados = servicos.filter(servico => {
   if (filtroDisponibilidade === 'disponiveis') {
     return servico.disponivel;
   }
   return true;
 });

 const handleContratarServico = (nomeServico) => {
   setServicoContratado(nomeServico);
   setModalAberto(true);
 };

 const fecharModal = () => {
   setModalAberto(false);
 };

 return (
   <div className="min-h-screen bg-gray-50 p-6 relative">
     {modalAberto && (
       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
         <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl transform transition-all duration-300 scale-100">
           <div className="flex justify-between items-center mb-4">
             <h2 className="text-xl font-bold text-[rgb(0,128,128)]">Serviço contratado!</h2>
             <button 
               onClick={fecharModal}
               className="text-gray-500 hover:text-gray-700 hover:scale-110 transition-transform duration-200"
             >
               <X className="w-6 h-6" />
             </button>
           </div>
           <p className="text-gray-700 mb-6">
             Você contratou com sucesso o serviço de <span className="font-semibold">{servicoContratado}</span>.
             Em breve ele entrará em contato para confirmar os detalhes.
           </p>
           <div className="flex justify-end">
             <button
               onClick={fecharModal}
               className="px-6 py-2 bg-[rgb(0,128,128)] text-white rounded-lg hover:bg-[rgba(0,128,128,0.9)] hover:scale-105 transition-all duration-300"
             >
               Entendido
             </button>
           </div>
         </div>
       </div>
     )}

     <div className="flex justify-between items-center mb-8">
       <h1 className="text-4xl sm:text-5xl font-bold text-[#008080]">
         Vitrine de Serviços Disponíveis
       </h1>
       <div className="flex space-x-4">
         <div className="relative">
           <button 
             className="flex items-center px-4 py-2 bg-[rgb(0,128,128)] text-white rounded-lg shadow-sm hover:scale-105 transition-transform duration-300"
             onClick={() => setMostrarFiltros(!mostrarFiltros)}
           >
             <Filter className="w-4 h-4 mr-2" />
             Filtros
             <ChevronDown className="w-4 h-4 ml-2" />
           </button>
           
           {mostrarFiltros && (
             <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 overflow-hidden">
               <div className="py-1">
                 <button
                   className={`block px-4 py-2 text-sm w-full text-left hover:bg-[rgba(0,128,128,0.1)] hover:scale-[1.02] transition-transform duration-200 ${
                     filtroDisponibilidade === 'todos' ? 'bg-[rgba(0,128,128,0.2)] text-[rgb(0,128,128)]' : 'text-gray-700'
                   }`}
                   onClick={() => {
                     setFiltroDisponibilidade('todos');
                     setMostrarFiltros(false);
                   }}
                 >
                   Mostrar todos
                 </button>
                 <button
                   className={`block px-4 py-2 text-sm w-full text-left hover:bg-[rgba(0,128,128,0.1)] hover:scale-[1.02] transition-transform duration-200 ${
                     filtroDisponibilidade === 'disponiveis' ? 'bg-[rgba(0,128,128,0.2)] text-[rgb(0,128,128)]' : 'text-gray-700'
                   }`}
                   onClick={() => {
                     setFiltroDisponibilidade('disponiveis');
                     setMostrarFiltros(false);
                   }}
                 >
                   Apenas disponíveis
                 </button>
               </div>
             </div>
           )}
         </div>
         <div className="relative">
           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
           <input
             type="text"
             placeholder="Buscar serviços..."
             className="pl-10 pr-4 py-2 rounded-lg shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(0,128,128)] focus:border-transparent"
           />
         </div>
       </div>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {servicosFiltrados.map((servico) => (
         <div key={servico.id} className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
           <div className="p-6 pb-0">
             <div className="flex justify-between items-start">
               <div className="flex items-center space-x-4">
                 <div className={`p-3 rounded-full ${servico.disponivel ? 'bg-green-50' : 'bg-gray-100'}`}>
                   <servico.icone className={`w-6 h-6 ${servico.disponivel ? 'text-green-600' : 'text-gray-400'}`} />
                 </div>
                 <div>
                   <h3 className="font-bold text-gray-800">{servico.nome}</h3>
                   <p className="text-sm text-gray-500">{servico.profissao}</p>
                 </div>
               </div>
               <button className="text-gray-400 hover:text-gray-600 hover:scale-110 transition-transform duration-200">
                 <MoreVertical className="w-5 h-5" />
               </button>
             </div>
           </div>

           <div className="p-6 pt-4">
             <div className="flex items-center text-sm text-gray-500 mb-3">
               <MapPin className="w-4 h-4 mr-2" />
               {servico.bloco}
             </div>
             <div className="flex items-center text-sm text-gray-500 mb-4">
               <Phone className="w-4 h-4 mr-2" />
               {servico.telefone}
             </div>
             <div className="flex items-center text-sm text-gray-500 mb-4">
               <Clock8 className="w-4 h-4 mr-2" />
               {servico.PublicadoEm}
             </div>

             <div className="flex justify-between items-center">
               <div className="flex items-center">
                 {[...Array(5)].map((_, i) => (
                   <Star
                     key={i}
                     className={`w-4 h-4 ${i < Math.floor(servico.nota) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                   />
                 ))}
                 <span className="ml-2 text-sm font-medium text-gray-600">{servico.nota}</span>
               </div>

               <span className={`px-3 py-1 rounded-full text-xs font-medium ${servico.disponivel ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                 {servico.disponivel ? 'Disponível' : 'Indisponível'}
               </span>
             </div>
           </div>

           <div className="border-t border-gray-100 px-6 py-3 bg-gray-50">
             <button 
               className={`w-full py-2 rounded-lg font-medium transition-all duration-300 ${
                 servico.disponivel 
                   ? 'bg-[rgb(0,128,128)] hover:bg-[rgba(0,128,128,0.9)] text-white hover:scale-105' 
                   : 'bg-gray-200 text-gray-500 cursor-not-allowed'
               }`}
               disabled={!servico.disponivel}
               onClick={() => servico.disponivel && handleContratarServico(servico.nome)}
             >
               {servico.disponivel ? 'Contratar Serviço' : 'Indisponível'}
             </button>
           </div>
         </div>
       ))}
     </div>

     {/* Aq sao os cards de estatisticas , fazem um parametro geral de servicos e disponiveis*/}
     <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
       <div className="bg-white p-6 rounded-xl shadow-sm hover:scale-[1.02] transition-transform duration-300">
         <h3 className="text-gray-500 text-sm font-medium">Total de Serviços</h3>
         <p className="text-2xl font-bold text-[rgb(0,128,128)] mt-2">{servicos.length}</p>
         <p className="text-green-500 text-sm mt-1">+12% no último mês</p>
       </div>
       <div className="bg-white p-6 rounded-xl shadow-sm hover:scale-[1.02] transition-transform duration-300">
         <h3 className="text-gray-500 text-sm font-medium">Disponíveis</h3>
         <p className="text-2xl font-bold text-[rgb(0,128,128)] mt-2">{servicos.filter(s => s.disponivel).length}</p>
         <p className="text-green-500 text-sm mt-1">+5% no último mês</p>
       </div>
       <div className="bg-white p-6 rounded-xl shadow-sm hover:scale-[1.02] transition-transform duration-300">
         <h3 className="text-gray-500 text-sm font-medium">Avaliação Média</h3>
         <p className="text-2xl font-bold text-[rgb(0,128,128)] mt-2">
           {(servicos.reduce((acc, curr) => acc + curr.nota, 0) / servicos.length).toFixed(1)}
         </p>
         <div className="flex mt-1">
           {[...Array(5)].map((_, i) => (
             <Star
               key={i}
               className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-400'}`}
             />
           ))}
         </div>
       </div>
       <div className="bg-white p-6 rounded-xl shadow-sm hover:scale-[1.02] transition-transform duration-300">
         <h3 className="text-gray-500 text-sm font-medium">Novos este mês</h3>
         <p className="text-2xl font-bold text-[rgb(0,128,128)] mt-2">5</p>
         <button className="text-[rgb(0,128,128)] hover:text-[rgba(0,128,128,0.8)] hover:scale-105 transition-transform duration-200 text-sm mt-1">
           Ver todos
         </button>
       </div>
     </div>
   </div>
 );
}

export default ComponentServicos;