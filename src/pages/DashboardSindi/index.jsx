import { useState } from "react";
import HeaderSindi from "../../components/HeaderSindi";
import SidebarSindi from "../../components/SideBarSindi";
import { Bell, Calendar, FileText, Wallet, Users, MessageSquare, AlertCircle, CheckCircle, XCircle, Plus, ChevronRight, ChevronDown } from "lucide-react";

export function DashboardSindi() {
  // estados basicos dos modais cuidado se for mexer aq
  const [showAvisoModal, setShowAvisoModal] = useState(false);
  const [showReuniaoModal, setShowReuniaoModal] = useState(false);
  const [showInadimplentesModal, setShowInadimplentesModal] = useState(false);
  
  // e os estados dos formularios aq
  const [avisoData, setAvisoData] = useState({
    titulo: "",
    mensagem: "",
    urgente: false
  });
  
  const [reuniaoData, setReuniaoData] = useState({
    titulo: "",
    data: "",
    horario: "",
    local: "Salão de Festas",
    descricao: ""
  });

  // esses dados estao estaticos apenas para apresentar por enquanto
  const solicitacoes = [
    {
      id: 1,
      morador: "Ana Costa",
      apartamento: "302B",
      tipo: "Manutenção",
      descricao: "Vazamento no banheiro",
      data: "15/03/2025",
      status: "pendente"
    },
    {
      id: 2,
      morador: "Carlos Mendes",
      apartamento: "105A",
      tipo: "Sugestão",
      descricao: "Instalar bicicletário coberto",
      data: "10/03/2025",
      status: "em_andamento"
    },
    {
      id: 3,
      morador: "Roberto Alves",
      apartamento: "403C",
      tipo: "Reclamação",
      descricao: "Barulho excessivo após 22h",
      data: "05/03/2025",
      status: "resolvido"
    }
  ];

  const pagamentos = {
    emDia: 85,
    inadimplentes: 15,
    total: 100
  };

  const moradoresInadimplentes = [
    { nome: "João Silva", apartamento: "201A", meses: 2, valor: 1000 },
    { nome: "Maria Oliveira", apartamento: "305B", meses: 1, valor: 500 },
    { nome: "Pedro Santos", apartamento: "102C", meses: 3, valor: 1500 }
  ];

  // essas constantes servem para os eventos de manipulacoes dos modais 
  const handleAvisoSubmit = (e) => {
    e.preventDefault();
    console.log("Aviso enviado:", avisoData);
    setShowAvisoModal(false);
    setAvisoData({ titulo: "", mensagem: "", urgente: false });
  };

  const handleReuniaoSubmit = (e) => {
    e.preventDefault();
    console.log("Reunião agendada:", reuniaoData);
    setShowReuniaoModal(false);
    setReuniaoData({
      titulo: "",
      data: "",
      horario: "",
      local: "Salão de Festas",
      descricao: ""
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarSindi />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderSindi />
   
        <main className="flex-1 p-6 overflow-y-auto">
        <div className="relative pl-6 pt-6 pb-4">
  <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#008080] via-[#006666] to-[#004444] tracking-tight">
    Dashboard Síndico
    <span className="absolute -bottom-1 left-6 h-1 w-20 bg-gradient-to-r from-[#008080] to-[#004444] rounded-full"></span>
  </h1>
  <p className="text-sm text-gray-500 mt-1 pl-1 font-medium">Painel de controle completo</p>
</div>
          {/*aqui sao acoes rapidas do sindico mas ainda vou fazer a pagina de reunioes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button 
              onClick={() => setShowAvisoModal(true)}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-between group border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <MessageSquare className="text-blue-600" />
                </div>
                <span className="font-medium text-gray-700">Novo Aviso</span>
              </div>
              <ChevronRight className="text-gray-400 group-hover:text-blue-600 transition-colors" />
            </button>
            
            <button 
              onClick={() => setShowReuniaoModal(true)}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-between group border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
                  <Calendar className="text-green-600" />
                </div>
                <span className="font-medium text-gray-700">Agendar Reunião</span>
              </div>
              <ChevronRight className="text-gray-400 group-hover:text-green-600 transition-colors" />
            </button>
            
            <button 
              onClick={() => setShowInadimplentesModal(true)}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-between group border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-3 rounded-lg group-hover:bg-red-200 transition-colors">
                  <AlertCircle className="text-red-600" />
                </div>
                <span className="font-medium text-gray-700">Ver Inadimplentes</span>
              </div>
              <ChevronRight className="text-gray-400 group-hover:text-red-600 transition-colors" />
            </button>
          </div>

          {/* resumo fake do financeiro*/}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Wallet className="text-[#008080]" />
              Resumo Financeiro
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Moradores em dia</span>
                  <CheckCircle className="text-green-500" />
                </div>
                <div className="mt-2 flex items-end justify-between">
                  <span className="text-3xl font-bold text-gray-800">{pagamentos.emDia}%</span>
                  <span className="text-gray-500">{pagamentos.total - Math.round(pagamentos.total * pagamentos.inadimplentes / 100)} moradores</span>
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Inadimplentes</span>
                  <XCircle className="text-red-500" />
                </div>
                <div className="mt-2 flex items-end justify-between">
                  <span className="text-3xl font-bold text-gray-800">{pagamentos.inadimplentes}%</span>
                  <span className="text-gray-500">{Math.round(pagamentos.total * pagamentos.inadimplentes / 100)} moradores</span>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total de moradores</span>
                  <Users className="text-blue-500" />
                </div>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-800">{pagamentos.total}</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setShowInadimplentesModal(true)}
              className="mt-4 text-sm text-[#008080] hover:text-[#006666] flex items-center gap-2 bg-[#008080]/10 px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#008080]/20"
            >
              Ver detalhes dos inadimplentes <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* solicitacoes fake dos moradores, tudo estatico por enquanto */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <MessageSquare className="text-[#008080]" />
                Solicitações dos Moradores
              </h2>
              <button className="text-sm text-[#008080] hover:text-[#006666] flex items-center gap-2">
                Ver todas <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Morador</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apartamento</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {solicitacoes.map((solicitacao) => (
                    <tr key={solicitacao.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{solicitacao.morador}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{solicitacao.apartamento}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{solicitacao.tipo}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{solicitacao.descricao}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{solicitacao.data}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          solicitacao.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' :
                          solicitacao.status === 'em_andamento' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {solicitacao.status === 'pendente' ? 'Pendente' : 
                           solicitacao.status === 'em_andamento' ? 'Em andamento' : 'Resolvido'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-[#008080] hover:text-[#006666] mr-3">
                          Visualizar
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mmodal de novo aviso  esse aqui o gpt cantou kkkkkkkkk */}
          {showAvisoModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-[#2C3E50]">Novo Aviso</h3>
                  <button onClick={() => setShowAvisoModal(false)} className="text-gray-500 hover:text-gray-700">
                    ✕
                  </button>
                </div>
                
                <form onSubmit={handleAvisoSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Título</label>
                    <input
                      type="text"
                      value={avisoData.titulo}
                      onChange={(e) => setAvisoData({...avisoData, titulo: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                      placeholder="Digite o título do aviso"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Mensagem</label>
                    <textarea
                      value={avisoData.mensagem}
                      onChange={(e) => setAvisoData({...avisoData, mensagem: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] h-32"
                      placeholder="Digite a mensagem"
                      required
                    />
                  </div>
                  
                  <div className="mb-6 flex items-center">
                    <input
                      type="checkbox"
                      id="urgente"
                      checked={avisoData.urgente}
                      onChange={(e) => setAvisoData({...avisoData, urgente: e.target.checked})}
                      className="w-4 h-4 text-[#008080] rounded focus:ring-[#008080] border-gray-300"
                    />
                    <label htmlFor="urgente" className="ml-2 text-sm text-gray-700">
                      Aviso urgente
                    </label>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowAvisoModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666]"
                    >
                      Enviar Aviso
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* esse modal eh o de agendar reuniao, tudo estatico por enquanto */}
          {showReuniaoModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-[#2C3E50]">Agendar Reunião</h3>
                  <button onClick={() => setShowReuniaoModal(false)} className="text-gray-500 hover:text-gray-700">
                    ✕
                  </button>
                </div>
                
                <form onSubmit={handleReuniaoSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Título</label>
                    <input
                      type="text"
                      value={reuniaoData.titulo}
                      onChange={(e) => setReuniaoData({...reuniaoData, titulo: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                      placeholder="Assunto da reunião"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Data</label>
                      <input
                        type="date"
                        value={reuniaoData.data}
                        onChange={(e) => setReuniaoData({...reuniaoData, data: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Horário</label>
                      <input
                        type="time"
                        value={reuniaoData.horario}
                        onChange={(e) => setReuniaoData({...reuniaoData, horario: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Local</label>
                    <select
                      value={reuniaoData.local}
                      onChange={(e) => setReuniaoData({...reuniaoData, local: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                    >
                      <option value="Salão de Festas">Salão de Festas</option>
                      <option value="Área Gourmet">Área Gourmet</option>
                      <option value="Sala de Reuniões">Sala de Reuniões</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Descrição</label>
                    <textarea
                      value={reuniaoData.descricao}
                      onChange={(e) => setReuniaoData({...reuniaoData, descricao: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] h-32"
                      placeholder="Detalhes da reunião"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowReuniaoModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666]"
                    >
                      Agendar Reunião
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* esse eh o modal de inadimplentes, tudo estatico por enquanto  tbm*/}
          {showInadimplentesModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-[#2C3E50]">Moradores Inadimplentes</h3>
                  <button onClick={() => setShowInadimplentesModal(false)} className="text-gray-500 hover:text-gray-700">
                    ✕
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Morador</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apartamento</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meses</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Devido</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {moradoresInadimplentes.map((morador, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{morador.nome}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{morador.apartamento}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{morador.meses}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {morador.valor.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-[#008080] hover:text-[#006666] mr-3">
                              Notificar
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              Histórico
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowInadimplentesModal(false)}
                    className="px-6 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666]"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}