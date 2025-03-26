import { useState } from 'react';
import HeaderMorador from "../../components/HeaderMorador";
import SidebarMorador from "../../components/SidebarMorador";

export function SolicitacaoMorador() {
  const [modalAberto, setModalAberto] = useState(false);
  const [modalVisualizarAberto, setModalVisualizarAberto] = useState(false);
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState(null);
  const [tipoSolicitacao, setTipoSolicitacao] = useState('');
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
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

            {/* Esse eh o modal para novas solicitações!! mas nao coloquei localstorage */}
            {modalAberto && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-[rgb(0,128,128)]">Nova Solicitação</h2>
                    <button 
                      onClick={fecharModal}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Tipo de Solicitação</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setTipoSolicitacao('Reclamação')}
                        className={`py-2 px-4 rounded-lg border ${tipoSolicitacao === 'Reclamação' ? 'border-[rgb(0,128,128)] bg-[rgba(0,128,128,0.1)]' : 'border-gray-300'}`}
                      >
                        Reclamação
                      </button>
                      <button
                        onClick={() => setTipoSolicitacao('Aviso')}
                        className={`py-2 px-4 rounded-lg border ${tipoSolicitacao === 'Aviso' ? 'border-[rgb(0,128,128)] bg-[rgba(0,128,128,0.1)]' : 'border-gray-300'}`}
                      >
                        Aviso
                      </button>
                      <button
                        onClick={() => setTipoSolicitacao('Solicitação')}
                        className={`py-2 px-4 rounded-lg border ${tipoSolicitacao === 'Solicitação' ? 'border-[rgb(0,128,128)] bg-[rgba(0,128,128,0.1)]' : 'border-gray-300'}`}
                      >
                        Solicitação
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Título</label>
                    <input
                      type="text"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(0,128,128)]"
                      placeholder="Digite o título"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Conteúdo</label>
                    <textarea
                      value={conteudo}
                      onChange={(e) => setConteudo(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(0,128,128)] h-32"
                      placeholder="Descreva sua solicitação"
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={fecharModal}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={enviarSolicitacao}
                      className="px-6 py-2 bg-[rgb(0,128,128)] text-white rounded-lg hover:bg-[rgba(0,128,128,0.9)]"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* esse modal eh para visualizar as solicitações */}
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

            {/* aqui eh o historico de solicitacoes, porem so coloquei 3 como exemplo */}
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