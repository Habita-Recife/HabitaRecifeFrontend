import { useState } from 'react';
import HeaderMorador from "../../components/HeaderMorador";
import SidebarMorador from "../../components/SidebarMorador";
import ModalSolicitacao from "../../components/ModalSolicitacao";

export function SolicitacaoMorador() {
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
  const [reservaData, setReservaData] = useState({
    espaco: '',
  data: '',
  horario: '',
  descricao: ''
});

  const [solicitacoes, setSolicitacoes] = useState([
    {
      id: 1,
      tipo: 'Solicitação',
      titulo: 'Adicionar encanador na vitrine',
      conteudo: 'Me adicione na vitrine de serviços como encanador',
      data: '15/05/2023',
      status: 'Concluído'
    },
    {
      id: 2,
      tipo: 'Reclamação',
      titulo: 'Barulho excessivo',
      conteudo: 'Muito barulho vindo do apartamento 302 após as 22h.',
      data: '10/05/2023',
      status: 'Em andamento'
    },
    {
      id: 3,
      tipo: 'Aviso',
      titulo: 'Portão da garagem',
      conteudo: 'O portão da garagem está com defeito no sensor.',
      data: '05/05/2023',
      status: 'Pendente'
    }
  ]);

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

  const enviarSolicitacao = () => {
    if (!tipoSolicitacao || !titulo || !conteudo) {
      alert('Preencha todos os campos!');
      return;
    }

    const novaSolicitacao = {
      id: solicitacoes.length + 1,
      tipo: tipoSolicitacao,
      titulo,
      conteudo,
      data: new Date().toLocaleDateString('pt-BR'),
      status: 'Pendente'
    };

    setSolicitacoes([novaSolicitacao, ...solicitacoes]);
    fecharModal();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Concluído':
        return 'bg-green-100 text-green-800';
      case 'Em andamento':
        return 'bg-blue-100 text-blue-800';
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarMorador />

      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderMorador />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Minhas Solicitações</h1>
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

            {/* Modal para visualizar solicitações */}
            {modalVisualizarAberto && solicitacaoSelecionada && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-[rgb(0,128,128)]">Detalhes da Solicitação</h2>
                    <button
                      onClick={fecharModalVisualizar}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Tipo</h3>
                      <p className="mt-1 text-sm text-gray-900">{solicitacaoSelecionada.tipo}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Título</h3>
                      <p className="mt-1 text-sm text-gray-900">{solicitacaoSelecionada.titulo}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Data</h3>
                      <p className="mt-1 text-sm text-gray-900">{solicitacaoSelecionada.data}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Status</h3>
                      <span className={`mt-1 px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(solicitacaoSelecionada.status)}`}>
                        {solicitacaoSelecionada.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Conteúdo</h3>
                      <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">{solicitacaoSelecionada.conteudo}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={fecharModalVisualizar}
                      className="px-6 py-2 bg-[rgb(0,128,128)] text-white rounded-lg hover:bg-[rgba(0,128,128,0.9)]"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Histórico de solicitações */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {solicitacoes.map((solicitacao) => (
                      <tr key={solicitacao.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">{solicitacao.tipo}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{solicitacao.titulo}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-500">{solicitacao.data}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(solicitacao.status)}`}>
                            {solicitacao.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => visualizarSolicitacao(solicitacao)}
                            className="text-[rgb(0,128,128)] hover:text-[rgba(0,128,128,0.8)] mr-3"
                          >
                            Visualizar
                          </button>
                          {solicitacao.status === 'Pendente' && (
                            <button className="text-red-600 hover:text-red-900">
                              Cancelar
                            </button>
                          )}
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
    </div>
  );
}

export default SolicitacaoMorador;