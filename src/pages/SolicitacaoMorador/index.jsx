import { useState, useEffect } from 'react';
import HeaderMorador from "../../components/HeaderMorador";
import SidebarMorador from "../../components/SidebarMorador";
import ModalSolicitacao from "../../components/ModalSolicitacao";
import { Eye, X } from "lucide-react";
import { listarCondominios, listarMoradores, enviarSolicitacaoVitrine } from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";

export function SolicitacaoMorador() {
  const { user, accessToken } = useAuth();
  const [modalAberto, setModalAberto] = useState(false);
  const [modalVisualizarAberto, setModalVisualizarAberto] = useState(false);
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState(null);
  const [tipoSolicitacao, setTipoSolicitacao] = useState('');
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [tipoVitrine, setTipoVitrine] = useState('');
  const [nomeProduto, setNomeProduto] = useState('');
  const [valorProduto, setValorProduto] = useState('');
  const [descricaoProduto, setDescricaoProduto] = useState('');
  const [telefoneContato, setTelefoneContato] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [erroMensagem, setErroMensagem] = useState('');

  const [reservaData, setReservaData] = useState({
    espaco: '',
    data: '',
    horario: '',
    descricao: ''
  });

  const [solicitacoes, setSolicitacoes] = useState([]);
  const [idSindico, setIdSindico] = useState(null);
  const [idMorador, setIdMorador] = useState(null);

  useEffect(() => {
    const emailMorador = user?.sub;

    if (!emailMorador) {
      console.error('Erro: E-mail do morador não encontrado no token.');
      return;
    }

    listarCondominios()
      .then((response) => {
        const condominio = response.data.find(c =>
          c.morador?.some(m => m.emailMorador === emailMorador)
        );

        if (condominio) {
          const morador = condominio.morador.find(m => m.emailMorador === emailMorador);
          if (morador) {
            setIdMorador(morador.idMorador);
            console.log('ID do Morador:', morador.idMorador);

            if (condominio.sindico) {
              setIdSindico(condominio.sindico.id_sindico);
              console.log('ID do Síndico:', condominio.sindico.id_sindico);
            }

            listarMoradores(accessToken)
              .then((response) => {
                const moradorComSolicitacoes = response.data.find(m => m.idMorador === morador.idMorador);
                if (moradorComSolicitacoes) {
                  setSolicitacoes(moradorComSolicitacoes.solicitacao || []);
                  console.log('Solicitações carregadas:', moradorComSolicitacoes.solicitacao);
                }
              })
              .catch((error) => {
                console.error('Erro ao buscar solicitações do morador:', error);
              });
          }
        } else {
          console.error('Erro: Não foi possível identificar o condomínio associado ao morador.');
        }
      })
      .catch((error) => {
        console.error('Erro ao listar condomínios:', error);
      });
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDENTE":
        return "bg-yellow-100 text-yellow-800";
      case "APROVADO":
        return "bg-green-100 text-green-800";
      case "RECUSADO":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setTipoSolicitacao('');
    setTitulo('');
    setConteudo('');
  };

  const visualizarSolicitacao = (solicitacao) => {
    setSolicitacaoSelecionada(solicitacao);
    setModalVisualizarAberto(true);
  };

  const fecharModalVisualizar = () => {
    setModalVisualizarAberto(false);
    setSolicitacaoSelecionada(null);
  };

  const enviarSolicitacao = async () => {
    if (!tipoSolicitacao || !nomeProduto || !descricaoProduto) {
      alert('Preencha todos os campos!');
      return;
    }

    if (!idSindico) {
      alert('Erro: Não foi possível identificar o síndico associado.');
      return;
    }

    if (!idMorador) {
      alert('Erro: Não foi possível identificar o morador logado.');
      return;
    }

    try {
      if (tipoSolicitacao === 'POSTAGEM_VITRINE') {
        const solicitacao = {
          id_sindico: idSindico,
          idMorador,
          titulo: nomeProduto,
          conteudo: "VITRINE",
          tipo_solicitacao: tipoSolicitacao,
          status_solicitacao: "PENDENTE",
          data_criacao: new Date().toISOString(),
          nomeProduto,
          valorProduto: parseFloat(valorProduto),
          telefoneContato,
          descricaoProduto,
          tipoVitrine
        };

        await enviarSolicitacaoVitrine(solicitacao, accessToken);
        setSolicitacoes([solicitacao, ...solicitacoes]);
        fecharModal();
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("Erro ao enviar solicitação:", error);

      if (error.response) {
        setErroMensagem(error.response.data || "Erro ao enviar solicitação.");
      } else {
        setErroMensagem("Erro ao configurar a solicitação. Tente novamente.");
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarMorador />

      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderMorador />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold text-[#008080]">
                Solicitações
              </h1>
              <button
                onClick={abrirModal}
                className="px-6 py-2 bg-[rgb(0,128,128)] text-white rounded-lg hover:bg-[rgba(0,128,128,0.9)] hover:scale-105 transition-all duration-300"
              >
                Realizar Solicitação
              </button>
            </div>

            {/* Modal para novas solicitações */}
            <ModalSolicitacao
              isOpen={modalAberto}
              onClose={fecharModal}
              tipoSolicitacao={tipoSolicitacao}
              setTipoSolicitacao={setTipoSolicitacao}
              tipoVitrine={tipoVitrine}
              setTipoVitrine={setTipoVitrine}
              nomeProduto={nomeProduto}
              setNomeProduto={setNomeProduto}
              valorProduto={valorProduto}
              setValorProduto={setValorProduto}
              descricaoProduto={descricaoProduto}
              setDescricaoProduto={setDescricaoProduto}
              telefoneContato={telefoneContato}
              setTelefoneContato={setTelefoneContato}
              titulo={titulo}
              setTitulo={setTitulo}
              conteudo={conteudo}
              setConteudo={setConteudo}
              reservaData={reservaData}
              setReservaData={setReservaData}
              onSubmit={enviarSolicitacao}
            />

            {/* Histórico de solicitações */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {solicitacoes.map((solicitacao, index) => (
                      <tr key={solicitacao.id_solicitacao || index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">
                            {solicitacao.titulo || "Sem título"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-500">
                            {solicitacao.dataCriacao
                              ? new Date(solicitacao.dataCriacao).toLocaleDateString("pt-BR")
                              : "Sem data"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              solicitacao.status_solicitacao
                            )}`}
                          >
                            {solicitacao.status_solicitacao || "Sem status"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            onClick={() => visualizarSolicitacao(solicitacao)}
                            className="text-[#2C3E50] hover:text-[#1a2633]"
                            title="Ver detalhes"
                          >
                            <Eye className="w-4 h-4 inline" /> Ver
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center shadow-xl">
            <div className="mb-4">
              <svg
                className="w-16 h-16 text-green-500 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Solicitação Enviada!</h3>
            <p className="text-gray-600 mb-6">
              Sua solicitação foi enviada com sucesso e está aguardando aprovação.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="px-6 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666]"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {erroMensagem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-sm flex items-center justify-center">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <h2 className="text-xl font-bold text-[rgb(0,128,128)]">Atenção</h2>
              </div>
              <button
                onClick={() => setErroMensagem('')}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">{erroMensagem}</p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setErroMensagem('')}
                className="px-4 py-2 bg-[rgb(0,128,128)] text-white rounded-lg hover:bg-[rgba(0,128,128,0.9)]"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para visualizar solicitação */}
      {modalVisualizarAberto && solicitacaoSelecionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[rgb(0,128,128)]">Detalhes da Solicitação</h2>
              <button onClick={fecharModalVisualizar} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <p><strong>Título:</strong> {solicitacaoSelecionada.titulo || "Sem título"}</p>
              <p><strong>Conteúdo:</strong> {solicitacaoSelecionada.conteudo || "Sem conteúdo"}</p>
              <p><strong>Status:</strong> {solicitacaoSelecionada.status_solicitacao || "Sem status"}</p>
              <p><strong>Data de Criação:</strong> {solicitacaoSelecionada.dataCriacao
                ? new Date(solicitacaoSelecionada.dataCriacao).toLocaleDateString("pt-BR")
                : "Sem data"}</p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={fecharModalVisualizar}
                className="px-4 py-2 bg-[rgb(0,128,128)] text-white rounded-lg hover:bg-[rgba(0,128,128,0.9)]"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SolicitacaoMorador;