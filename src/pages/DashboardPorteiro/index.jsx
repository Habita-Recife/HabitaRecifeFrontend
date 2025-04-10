import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderPorteiro from "../../components/HeaderPorteiro";
import { Package, UserPlus, CheckCircle } from 'lucide-react';
import { listarPorteiros, cadastrarVisitante, listarVisitantes, registrarSaidaVisitante } from '../../utils/api';
import InputCpf from "../../components/InputCpf";
import InputTelefone from '../../components/InputTelefone';
import { useAuth } from "../../contexts/AuthContext";

export function DashboardPorteiro() {
  const { accessToken, user } = useAuth();
  const navigate = useNavigate();

  const [porteiro, setPorteiro] = useState({});
  const [showEncomendaModal, setShowEncomendaModal] = useState(false);
  const [showVisitanteModal, setShowVisitanteModal] = useState(false);
  const [encomendas, setEncomendas] = useState([]);
  const [visitantes, setVisitantes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (accessToken) {

      if (user.roles[0] !== 'ROLE_PORTEIRO') {
        navigate('/login');
      } else {
        listarPorteiros(accessToken).then((response) => {
          const porteiroLogado = response.data.find(c =>
            c.emailPorteiro === user.sub
          );
          
          if (porteiroLogado) {
            setPorteiro(response.data);
          }
        });

        listarVisitantes(accessToken).then((response) => {

          setVisitantes(response.data);
          setIsLoading(false);
        }).catch(error => {
          console.error("Erro ao carregar visitantes:", error);
          setIsLoading(false);
        });
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const [novaEncomenda, setNovaEncomenda] = useState({
    morador: '',
    apartamento: '',
    data: new Date().toISOString().split('T')[0],
    tipo: 'Pacote'
  });

  const [novoVisitante, setNovoVisitante] = useState({
    nomeVisitante: '',
    cpfVisitante: '',
    numeroTelefone: ''
  });


  const handleOpenEncomendaModal = () => setShowEncomendaModal(true);
  const handleCloseEncomendaModal = () => setShowEncomendaModal(false);

  const handleOpenVisitanteModal = () => setShowVisitanteModal(true);
  const handleCloseVisitanteModal = () => setShowVisitanteModal(false);


  const handleEncomendaChange = (e) => {
    const { name, value } = e.target;
    setNovaEncomenda(prev => ({ ...prev, [name]: value }));
  };

  const handleVisitanteChange = (e) => {
    const { name, value } = e.target;
    setNovoVisitante(prev => ({ ...prev, [name]: value }));
  };

  const handleCpfChange = (value) => {
    setNovoVisitante(prev => ({ ...prev, cpfVisitante: value }));
  };

  const handleTelefoneChange = (value) => {
    setNovoVisitante(prev => ({ ...prev, numeroTelefone: value }));
  };

  const handleSubmitEncomenda = (e) => {
    e.preventDefault();
    setEncomendas([...encomendas, { ...novaEncomenda, id: Date.now() }]);
    setNovaEncomenda({
      morador: '',
      apartamento: '',
      data: new Date().toISOString().split('T')[0],
      tipo: 'Pacote'
    });
    handleCloseEncomendaModal();
  };

  const handleSubmitVisitante = (e) => {
    e.preventDefault();
    cadastrarVisitante(novoVisitante, accessToken)
      .then(response => {
        listarVisitantes(accessToken).then((response) => {
          setVisitantes(response.data);
        });

        setNovoVisitante({
          nomeVisitante: '',
          cpfVisitante: '',
          numeroTelefone: ''
        });
        handleCloseVisitanteModal();
      })
      .catch(error => {
        console.error("Erro ao cadastrar visitante:", error);
        alert("Erro ao cadastrar visitante: " + (error.response?.data?.message || error.message));
      });
  };


  const handleSaidaVisitante = (idVisitante) => {

    if (!idVisitante) {
      console.error("ID do visitante é undefined ou null");
      alert("Erro: ID do visitante não encontrado");
      return;
    }

    registrarSaidaVisitante(idVisitante, porteiro.idPorteiro, accessToken)
      .then(response => {
        return listarVisitantes(accessToken);
      })
      .then(response => {
        setVisitantes(response.data);
        setShowSuccessModal(true);
      })
      .catch(error => {
        console.error("Erro ao registrar saída:", error);
        alert("Erro ao registrar saída: " + (error.response?.data?.message || error.message));
      });
  };


  const formatarDataHora = (dataString) => {
    if (!dataString) return '-';

    try {
      const partes = dataString.split(' ');
      if (partes.length >= 2) {
        const horario = partes[1].split(':');
        return `${horario[0]}:${horario[1]}`;
      }
      return dataString;
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return dataString;
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-700">Carregando...</p>
        </div>
      </div>
    );
  }



  return (
    <div className="flex h-screen bg-gray-50">

      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderPorteiro />

        <main className="flex-1 p-6 overflow-auto">

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Bom dia, {porteiro?.nomePorteiro?.split(' ')[0] || 'Porteiro'}!
            </h1>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <button
              onClick={handleOpenEncomendaModal}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all flex items-center gap-4"
            >
              <div className="bg-blue-100 p-3 rounded-full">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg text-gray-800">Registrar Encomenda</h3>
                <p className="text-gray-600 text-sm">Registre uma nova encomenda recebida</p>
              </div>
            </button>

            <button
              onClick={handleOpenVisitanteModal}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all flex items-center gap-4"
            >
              <div className="bg-green-100 p-3 rounded-full">
                <UserPlus className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg text-gray-800">Registrar Visitante</h3>
                <p className="text-gray-600 text-sm">Registre a entrada de um novo visitante</p>
              </div>
            </button>
          </div>


          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              Histórico de Encomendas
            </h2>

            {encomendas.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Morador</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Apartamento</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {encomendas.map((encomenda, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{encomenda.morador}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{encomenda.apartamento}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{encomenda.tipo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{encomenda.data}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">Nenhuma encomenda registrada ainda</p>
            )}
          </div>


          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-green-600" />
              Histórico de Visitantes
            </h2>

            {visitantes.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CPF</th>

                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entrada</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Saída</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {visitantes.map((visitante, index) => {
                      const fluxoEntrada = visitante.fluxos?.find(f => f.tipoFluxo === "ENTRADA");

                      const fluxoSaida = visitante.fluxos?.find(f => f.tipoFluxo === "SAIDA");

                      const saidaRegistrada = visitante.statusVisitante === "INATIVO" || fluxoSaida !== undefined;

                      return (
                        <tr key={visitante.idVisitante || index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visitante.nomeVisitante}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visitante.cpfVisitante}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {fluxoEntrada ? fluxoEntrada.dataFluxo : "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {fluxoSaida ? fluxoSaida.dataFluxo : "Ainda no condomínio"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {!saidaRegistrada ? (
                              <button
                                onClick={() => handleSaidaVisitante(visitante.idVisitante)}
                                className="text-green-600 hover:text-green-800 flex items-center gap-1"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Registrar saída
                              </button>
                            ) : (
                              <span className="text-gray-400">Saída já registrada</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">Nenhum visitante registrado ainda</p>
            )}
          </div>
        </main>
      </div>


      {showEncomendaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Registrar Encomenda</h2>

            <form onSubmit={handleSubmitEncomenda}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Morador</label>
                  <input
                    type="text"
                    name="morador"
                    value={novaEncomenda.morador}
                    onChange={handleEncomendaChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apartamento</label>
                  <input
                    type="text"
                    name="apartamento"
                    value={novaEncomenda.apartamento}
                    onChange={handleEncomendaChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                  <input
                    type="date"
                    name="data"
                    value={novaEncomenda.data}
                    onChange={handleEncomendaChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                  <select
                    name="tipo"
                    value={novaEncomenda.tipo}
                    onChange={handleEncomendaChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="Pacote">Pacote</option>
                    <option value="Documento">Documento</option>
                    <option value="Encomenda Grande">Encomenda Grande</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseEncomendaModal}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {showVisitanteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Registrar Visitante</h2>

            <form onSubmit={handleSubmitVisitante}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                  <input
                    type="text"
                    name="nomeVisitante"
                    value={novoVisitante.nomeVisitante}
                    onChange={handleVisitanteChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                  <InputCpf
                    value={novoVisitante.cpfVisitante}
                    onChange={handleCpfChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <InputTelefone
                    value={novoVisitante.numeroTelefone}
                    onChange={handleTelefoneChange}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseVisitanteModal}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center">
            <div className="mb-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {'Saída registrada com sucesso!'}
            </h3>
            <p className="text-gray-600 mb-6">
              {'As informações do visitante foram atualizadas.'}
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="px-6 py-2 bg-[#2C3E50] text-white rounded-lg hover:bg-[#1a2633]"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}