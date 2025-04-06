import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarSindi from "../../components/SideBarSindi";
import HeaderSindi from "../../components/HeaderSindi";
import { Calendar, FileText, Users, MessageSquare, AlertCircle, CheckCircle, XCircle, ChevronRight, Clock, MapPin, Building2, Home, Car, Shield, PartyPopper, Baby, Bike } from "lucide-react";
import CadPorteiroSucessSindi from "../../components/CadPorteiroSucessSindi";
import CadMoradorSucessSindi from "../../components/CadMoradorSucessSindi";
import ListaDeMoradoresSindi from "../../components/ListaDeMoradoresSindi";
import ListaDePorteirosSindi from "../../components/ListaDePorteirosSindi";
import { cadastrarMorador, cadastrarPorteiro, listarCondominios } from "../../utils/api";
import { getDados } from "../../utils/utils";

export function DashboardSindi() {
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showAvisoModal, setShowAvisoModal] = useState(false);
  const [showReuniaoModal, setShowReuniaoModal] = useState(false);
  const [showInadimplentesModal, setShowInadimplentesModal] = useState(false);
  const [showCadastrarMoradorModal, setShowCadastrarMoradorModal] = useState(false);
  const [showCadastrarPorteiroModal, setShowCadastrarPorteiroModal] = useState(false);
  const [showSuccessMoradorModal, setShowSuccessMoradorModal] = useState(false);
  const [showSuccessPorteiroModal, setShowSuccessPorteiroModal] = useState(false);
  
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

  const [moradorData, setMoradorData] = useState({
    nomeMorador: "",
    emailMorador: "",
    veiculoMorador: "",
    tipoMorador: "PROPRIETARIO",
    cpfMorador: "",
    id_condominio: ""
  });

  const [porteiroData, setPorteiroData] = useState({
    nomePorteiro: "",
    emailPorteiro: "",
    cpfPorteiro: "",
    idCondominio: ""
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    listarCondominios().then((response) => {
      const condominio = response.data.find(c =>
        token && c.sindico != null && c.sindico.emailSindico === getDados(token).sub
      );
  
      if (condominio) {
        setMoradorData((prev) => ({
          ...prev,
          id_condominio: condominio.idCondominio
        }));

        setPorteiroData((prev) => ({
          ...prev,
          idCondominio: condominio.idCondominio
        }));
      }
    });

    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  const condominiumInfo = [
    { icon: <MapPin className="w-5 h-5 text-[#008080]" />, text: "Bairro nobre e de fácil acesso na cidade" },
    { icon: <Building2 className="w-5 h-5 text-[#008080]" />, text: "5 blocos residenciais" },
    { icon: <Home className="w-5 h-5 text-[#008080]" />, text: "200 unidades" },
    { icon: <Users className="w-5 h-5 text-[#008080]" />, text: "500 moradores" },
    { icon: <Car className="w-5 h-5 text-[#008080]" />, text: "1 vaga por unidade + visitantes" },
    { icon: <Shield className="w-5 h-5 text-[#008080]" />, text: "Portaria 24h, câmeras e controle digital" },
    { icon: <PartyPopper className="w-5 h-5 text-[#008080]" />, text: "Salão de festas e espaço gourmet" },
    { icon: <Baby className="w-5 h-5 text-[#008080]" />, text: "Playground e área verde" },
    { icon: <Bike className="w-5 h-5 text-[#008080]" />, text: "Bicicletário e coworking" }
  ];

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

  const handleMoradorSubmit = (e) => {
    e.preventDefault();
    
    cadastrarMorador(moradorData).then((response) => {
      setShowCadastrarMoradorModal(false);
      setShowSuccessMoradorModal(true);
      setMoradorData({...moradorData, nomeMorador: "", emailMorador: "", veiculoMorador: "", tipoMorador: "PROPRIETARIO", cpfMorador: "" });
    });
    
  };

  const handlePorteiroSubmit = (e) => {
    e.preventDefault();

    cadastrarPorteiro(porteiroData).then((response) => {
      setShowCadastrarPorteiroModal(false);
      setShowSuccessPorteiroModal(true);
      setPorteiroData({...porteiroData, nomePorteiro: "", emailPorteiro: "", cpfPorteiro: "" });
    });
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <SidebarSindi />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderSindi />
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#008080] via-[#006666] to-[#004444] bg-clip-text text-transparent">
                      Dashboard Síndico
                    </h1>
                    <span className="text-sm text-white bg-gradient-to-r from-[#008080] to-[#006666] px-4 py-1.5 rounded-full shadow-md">
                      Painel de Controle
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => setShowCadastrarMoradorModal(true)}
                      className="flex items-center gap-2 bg-[#008080] hover:bg-[#006666] text-white px-4 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Users className="w-4 h-4" />
                      Cadastrar Morador
                    </button>
                    <button 
                      onClick={() => setShowCadastrarPorteiroModal(true)}
                      className="flex items-center gap-2 bg-[#2C3E50] hover:bg-[#1a2633] text-white px-4 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Users className="w-4 h-4" />
                      Cadastrar Porteiro
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <Calendar className="w-5 h-5 text-[#008080]" />
                    <span className="font-medium text-gray-700">{formatDate(currentDateTime)}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <Clock className="w-5 h-5 text-[#008080]" />
                    <span className="font-medium text-gray-700">{formatTime(currentDateTime)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <button 
                onClick={() => setShowAvisoModal(true)}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4">
                  <div className="bg-blue-100 p-4 rounded-2xl group-hover:bg-blue-200 transition-colors duration-300">
                    <MessageSquare className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Novo Aviso</p>
                    <p className="text-lg font-bold text-gray-900">Enviar comunicação</p>
                  </div>
                </div>
              </button>

              <button 
                onClick={() => setShowReuniaoModal(true)}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4">
                  <div className="bg-green-100 p-4 rounded-2xl group-hover:bg-green-200 transition-colors duration-300">
                    <Calendar className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Agendar Reunião</p>
                    <p className="text-lg font-bold text-gray-900">Marcar assembleia</p>
                  </div>
                </div>
              </button>

              <button 
                onClick={() => setShowInadimplentesModal(true)}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4">
                  <div className="bg-red-100 p-4 rounded-2xl group-hover:bg-red-200 transition-colors duration-300">
                    <AlertCircle className="w-7 h-7 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Inadimplentes</p>
                    <p className="text-lg font-bold text-gray-900">Ver moradores</p>
                  </div>
                </div>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4">
                  <div className="bg-green-100 p-4 rounded-2xl group-hover:bg-green-200 transition-colors duration-300">
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Moradores em dia</p>
                    <p className="text-3xl font-bold text-gray-900">{pagamentos.emDia}%</p>
                    <p className="text-xs text-gray-500">{pagamentos.total - Math.round(pagamentos.total * pagamentos.inadimplentes / 100)} moradores</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4">
                  <div className="bg-red-100 p-4 rounded-2xl group-hover:bg-red-200 transition-colors duration-300">
                    <XCircle className="w-7 h-7 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Inadimplentes</p>
                    <p className="text-3xl font-bold text-gray-900">{pagamentos.inadimplentes}%</p>
                    <p className="text-xs text-gray-500">{Math.round(pagamentos.total * pagamentos.inadimplentes / 100)} moradores</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4">
                  <div className="bg-blue-100 p-4 rounded-2xl group-hover:bg-blue-200 transition-colors duration-300">
                    <Users className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Moradores</p>
                    <p className="text-3xl font-bold text-gray-900">{pagamentos.total}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4">
                  <div className="bg-purple-100 p-4 rounded-2xl group-hover:bg-purple-200 transition-colors duration-300">
                    <FileText className="w-7 h-7 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Solicitações</p>
                    <p className="text-3xl font-bold text-gray-900">{solicitacoes.length}</p>
                  </div>
                </div>
              </div>
            </div>

            <ListaDeMoradoresSindi />

            <ListaDePorteirosSindi />

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#008080]" />
                  Solicitações dos Moradores
                </h2>
                <button className="text-sm text-[#008080] hover:text-[#006666] flex items-center gap-2 bg-[#008080]/10 px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#008080]/20">
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

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#008080]" />
                  Informações do Condomínio
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {condominiumInfo.map((info, index) => (
                  <div 
                    key={index} 
                    className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#008080]/10 group-hover:bg-[#008080]/20 transition-colors duration-300">
                        {info.icon}
                      </div>
                      <p className="text-sm text-gray-700 group-hover:text-[#008080] transition-colors">{info.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

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

      {showCadastrarMoradorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#2C3E50]">Cadastrar Morador</h3>
              <button onClick={() => setShowCadastrarMoradorModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <form onSubmit={handleMoradorSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nome Completo</label>
                <input
                  type="text"
                  value={moradorData.nomeMorador}
                  onChange={(e) => setMoradorData({...moradorData, nomeMorador: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">E-mail</label>
                <input
                  type="email"
                  value={moradorData.emailMorador}
                  onChange={(e) => setMoradorData({...moradorData, emailMorador: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Veículo</label>
                <input
                  type="text"
                  value={moradorData.veiculoMorador}
                  onChange={(e) => setMoradorData({...moradorData, veiculoMorador: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  placeholder="Modelo e placa do veículo"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Tipo</label>
                <select
                  value={moradorData.tipoMorador}
                  onChange={(e) => setMoradorData({...moradorData, tipoMorador: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                >
                  <option key="PROPRIETARIO" value="PROPRIETARIO">Proprietário</option>
                  <option key="FAMILIAR" value="FAMILIAR">Familiar</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">CPF</label>
                <input
                  type="text"
                  value={moradorData.cpfMorador}
                  onChange={(e) => setMoradorData({...moradorData, cpfMorador: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCadastrarMoradorModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666]"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCadastrarPorteiroModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#2C3E50]">Cadastrar Porteiro</h3>
              <button onClick={() => setShowCadastrarPorteiroModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <form onSubmit={handlePorteiroSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nome Completo</label>
                <input
                  type="text"
                  value={porteiroData.nomePorteiro}
                  onChange={(e) => setPorteiroData({...porteiroData, nomePorteiro: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">E-mail</label>
                <input
                  type="email"
                  value={porteiroData.emailPorteiro}
                  onChange={(e) => setPorteiroData({...porteiroData, emailPorteiro: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">CPF</label>
                <input
                  type="text"
                  value={porteiroData.cpfPorteiro}
                  onChange={(e) => setPorteiroData({...porteiroData, cpfPorteiro: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCadastrarPorteiroModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666]"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <CadPorteiroSucessSindi isOpen={showSuccessPorteiroModal} onClose={() => setShowSuccessPorteiroModal(false)} />
      <CadMoradorSucessSindi isOpen={showSuccessMoradorModal} onClose={() => setShowSuccessMoradorModal(false)} />
    </div>
  );
}