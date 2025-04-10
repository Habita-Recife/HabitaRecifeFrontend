import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarSindi from "../../components/SideBarSindi";
import HeaderSindi from "../../components/HeaderSindi";
import InputCpf from "../../components/InputCpf";
import { Calendar, FileText, Users, MessageSquare, AlertCircle, CheckCircle, XCircle, Clock, Eye, Edit } from "lucide-react";
import ListaDeMoradoresSindi from "../../components/ListaDeMoradoresSindi";
import ListaDePorteirosSindi from "../../components/ListaDePorteirosSindi";
import { cadastrarMorador, cadastrarPorteiro, listarCondominios, listarSolicitacoes } from "../../utils/api";
import { getDados } from "../../utils/utils";
import { aprovarSolicitacao, recusarSolicitacao } from "../../utils/api";

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
  const [atualizarListaPorteiros, setAtualizarListaPorteiros] = useState(false);
  const [atualizarListaMoradores, setAtualizarListaMoradores] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [moradores, setMoradores] = useState([]);
  const [modalVisualizarAberto, setModalVisualizarAberto] = useState(false);
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState(null);

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
    bloco: 0,
    apartamento: 0,
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

    listarSolicitacoes().then((response) => {
      setSolicitacoes(response.data);
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

  const abrirModalVisualizar = (solicitacao) => {
    setSolicitacaoSelecionada(solicitacao);
    setModalVisualizarAberto(true);
  };

  const fecharModalVisualizar = () => {
    setSolicitacaoSelecionada(null);
    setModalVisualizarAberto(false);
  };

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
      setAtualizarListaMoradores((atualiza) => !atualiza);
      setShowCadastrarMoradorModal(false);
      setShowSuccessModal(true);
      setMoradorData({ ...moradorData, nomeMorador: "", emailMorador: "", veiculoMorador: "", tipoMorador: "PROPRIETARIO", cpfMorador: "", bloco: 0, apartamento: 0 });
    });

  };

  const handlePorteiroSubmit = (e) => {
    e.preventDefault();

    cadastrarPorteiro(porteiroData).then((response) => {
      setAtualizarListaPorteiros((atualiza) => !atualiza);
      setShowCadastrarPorteiroModal(false);
      setShowSuccessModal(true);
      setPorteiroData({ ...porteiroData, nomePorteiro: "", emailPorteiro: "", cpfPorteiro: "" });
    });
  };

  const handleAprovar = async (id) => {
    try {
      await aprovarSolicitacao(id);
      setSolicitacoes((prev) =>
        prev.map((solicitacao) =>
          solicitacao.id_solicitacao === id
            ? { ...solicitacao, status_solicitacao: "APROVADO" }
            : solicitacao
        )
      );
    } catch (error) {
      console.error("Erro ao aprovar solicitação:", error);
    }
  };

  const handleRecusar = async (id) => {
    try {
      await recusarSolicitacao(id);
      setSolicitacoes((prev) =>
        prev.map((solicitacao) =>
          solicitacao.id_solicitacao === id
            ? { ...solicitacao, status_solicitacao: "RECUSADO" }
            : solicitacao
        )
      );
    } catch (error) {
      console.error("Erro ao recusar solicitação:", error);
    }
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
                    <h1 className="text-4xl sm:text-5xl font-bold text-[#008080]">
                      Dashboard
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
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

              {/* <button 
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
              </button> */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {/* <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group relative overflow-hidden">
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
              </div> */}

              {/* <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group relative overflow-hidden">
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
              </div> */}

              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4">
                  <div className="bg-blue-100 p-4 rounded-2xl group-hover:bg-blue-200 transition-colors duration-300">
                    <Users className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Moradores</p>
                    <p className="text-3xl font-bold text-gray-900">{moradores.length}</p>
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

            <ListaDeMoradoresSindi atualizar={atualizarListaMoradores} onChangeMoradores={setMoradores} />

            <ListaDePorteirosSindi atualizar={atualizarListaPorteiros} />

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#008080]" />
                  Solicitações dos Moradores
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {solicitacoes.map((solicitacao) => (
                      <tr key={solicitacao.id_solicitacao} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{solicitacao.titulo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{solicitacao.conteudo || "Sem tipo"}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${solicitacao.status_solicitacao === "PENDENTE"
                              ? "bg-yellow-100 text-yellow-800"
                              : solicitacao.status_solicitacao === "APROVADO"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                              }`}
                          >
                            {solicitacao.status_solicitacao || "Sem status"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => abrirModalVisualizar(solicitacao)}
                            className="text-[#2C3E50] hover:text-[#1a2633] flex items-center gap-1"
                            title="Ver detalhes"
                          >
                            <Eye className="w-4 h-4" /> Ver
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalVisualizarAberto && solicitacaoSelecionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Análise de Solicitação</h3>
              <button
                onClick={fecharModalVisualizar}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-gray-700 font-medium">Título:</p>
                <p className="text-gray-600">{solicitacaoSelecionada.titulo || "Sem título"}</p>
              </div>
              <div>
                <p className="text-gray-700 font-medium">Tipo:</p>
                <p className="text-gray-600">{solicitacaoSelecionada.conteudo || "Sem tipo"}</p>
              </div>
              <div>
                <p className="text-gray-700 font-medium">Status:</p>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${solicitacaoSelecionada.status_solicitacao === "PENDENTE"
                      ? "bg-yellow-100 text-yellow-800"
                      : solicitacaoSelecionada.status_solicitacao === "APROVADO"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                >
                  {solicitacaoSelecionada.status_solicitacao || "Sem status"}
                </span>
              </div>
              <div>
                <p className="text-gray-700 font-medium">Descrição:</p>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {solicitacaoSelecionada.vitrine?.descricaoProduto || "Sem descrição"}
                </p>
              </div>
            </div>

            {solicitacaoSelecionada.status_solicitacao === "PENDENTE" && (
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => handleRecusar(solicitacaoSelecionada.id_solicitacao)}
                  className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  <XCircle size={16} /> Recusar
                </button>
                <button
                  onClick={() => handleAprovar(solicitacaoSelecionada.id_solicitacao)}
                  className="flex items-center gap-2 px-6 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666]"
                >
                  <CheckCircle size={16} /> Aprovar
                </button>
              </div>
            )}
          </div>
        </div>
      )}


      {
        showAvisoModal && (
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
                    onChange={(e) => setAvisoData({ ...avisoData, titulo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                    placeholder="Digite o título do aviso"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Mensagem</label>
                  <textarea
                    value={avisoData.mensagem}
                    onChange={(e) => setAvisoData({ ...avisoData, mensagem: e.target.value })}
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
                    onChange={(e) => setAvisoData({ ...avisoData, urgente: e.target.checked })}
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
        )
      }

      {
        showReuniaoModal && (
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
                    onChange={(e) => setReuniaoData({ ...reuniaoData, titulo: e.target.value })}
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
                      onChange={(e) => setReuniaoData({ ...reuniaoData, data: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Horário</label>
                    <input
                      type="time"
                      value={reuniaoData.horario}
                      onChange={(e) => setReuniaoData({ ...reuniaoData, horario: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Local</label>
                  <select
                    value={reuniaoData.local}
                    onChange={(e) => setReuniaoData({ ...reuniaoData, local: e.target.value })}
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
                    onChange={(e) => setReuniaoData({ ...reuniaoData, descricao: e.target.value })}
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
        )
      }

      {
        showInadimplentesModal && (
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
        )
      }

      {
        showCadastrarMoradorModal && (
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
                    onChange={(e) => setMoradorData({ ...moradorData, nomeMorador: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">E-mail</label>
                  <input
                    type="email"
                    value={moradorData.emailMorador}
                    onChange={(e) => setMoradorData({ ...moradorData, emailMorador: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Veículo</label>
                  <input
                    type="text"
                    value={moradorData.veiculoMorador}
                    onChange={(e) => setMoradorData({ ...moradorData, veiculoMorador: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                    placeholder="Modelo e placa do veículo"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Tipo</label>
                  <select
                    value={moradorData.tipoMorador}
                    onChange={(e) => setMoradorData({ ...moradorData, tipoMorador: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  >
                    <option key="PROPRIETARIO" value="PROPRIETARIO">Proprietário</option>
                    <option key="FAMILIAR" value="FAMILIAR">Familiar</option>
                  </select>
                </div>

                <div className="mb-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-gray-700 mb-2">Bloco</label>
                      <input
                        type="number"
                        value={moradorData.bloco}
                        onChange={(e) => setMoradorData({ ...moradorData, bloco: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                        placeholder="Bloco"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-700 mb-2">Apartamento</label>
                      <input
                        type="number"
                        value={moradorData.apartamento}
                        onChange={(e) => setMoradorData({ ...moradorData, apartamento: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                        placeholder="Apartamento"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">CPF</label>
                  <InputCpf
                    value={moradorData.cpfMorador}
                    onChange={(val) => setMoradorData({ ...moradorData, cpfMorador: val })}
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
        )
      }

      {
        showCadastrarPorteiroModal && (
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
                    onChange={(e) => setPorteiroData({ ...porteiroData, nomePorteiro: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">E-mail</label>
                  <input
                    type="email"
                    value={porteiroData.emailPorteiro}
                    onChange={(e) => setPorteiroData({ ...porteiroData, emailPorteiro: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">CPF</label>
                  <InputCpf
                    value={porteiroData.cpfPorteiro}
                    onChange={(val) => setPorteiroData({ ...porteiroData, cpfPorteiro: val })}
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
        )
      }

      {
        showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center">
              <div className="mb-4">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {'Cadastro realizado com sucesso!'}
              </h3>
              <p className="text-gray-600 mb-6">
                {'O novo registro foi adicionado ao sistema.'}
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-6 py-2 bg-[#2C3E50] text-white rounded-lg hover:bg-[#1a2633]"
              >
                OK
              </button>
            </div>
          </div>
        )
      }
    </div >
  );
}