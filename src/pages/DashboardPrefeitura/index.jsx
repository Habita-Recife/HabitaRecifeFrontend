import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderPrefeitura from "../../components/HeaderPrefeitura";
import SidebarPorteiro from "../../components/SidebarPorteiro";
import { Building, Users, Plus, Edit, Trash2, ChevronRight, CheckCircle, XCircle } from "lucide-react";

export function DashboardPrefeitura() {
  const navigate = useNavigate();
  const [showCadastrarCondominioModal, setShowCadastrarCondominioModal] = useState(false);
  const [showCadastrarSindicoModal, setShowCadastrarSindicoModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [editingCondominio, setEditingCondominio] = useState(null);
  const [editingSindico, setEditingSindico] = useState(null);
  
  const [condominioData, setCondominioData] = useState({
    nome: "",
    endereco: "",
    bairro: "",
    quantidadeUnidades: "",
    sindicoResponsavel: ""
  });

  const [sindicoData, setSindicoData] = useState({
    nome: "",
    email: "",
    cpf: "",
    condominioResponsavel: ""
  });

  // Dados de exemplo
  const [condominios, setCondominios] = useState([
    {
      id: 1,
      nome: "Residencial Jardins",
      endereco: "Rua das Flores, 123",
      bairro: "Centro",
      quantidadeUnidades: 120,
      sindicoResponsavel: "Carlos Silva"
    },
    {
      id: 2,
      nome: "Edifício Golden Tower",
      endereco: "Av. Principal, 456",
      bairro: "Boa Vista",
      quantidadeUnidades: 80,
      sindicoResponsavel: "Ana Oliveira"
    }
  ]);

  const [sindicos, setSindicos] = useState([
    {
      id: 1,
      nome: "Carlos Silva",
      email: "carlos@email.com",
      cpf: "123.456.789-00",
      condominioResponsavel: "Residencial Jardins"
    },
    {
      id: 2,
      nome: "Ana Oliveira",
      email: "ana@email.com",
      cpf: "987.654.321-00",
      condominioResponsavel: "Edifício Golden Tower"
    }
  ]);

  const handleCondominioSubmit = (e) => {
    e.preventDefault();
    
    if (editingCondominio) {
      // e aqui pode editar o condominio que ja existe
      setCondominios(condominios.map(c => 
        c.id === editingCondominio.id ? {...condominioData, id: editingCondominio.id} : c
      ));
    } else {
      // essa eh a parte de adicionar um novo condominio
      const newCondominio = {
        ...condominioData,
        id: Date.now(),
        quantidadeUnidades: parseInt(condominioData.quantidadeUnidades)
      };
      setCondominios([...condominios, newCondominio]);
    }
    
    setShowCadastrarCondominioModal(false);
    setShowSuccessModal(true);
    setCondominioData({
      nome: "",
      endereco: "",
      bairro: "",
      quantidadeUnidades: "",
      sindicoResponsavel: ""
    });
    setEditingCondominio(null);
  };

  const handleSindicoSubmit = (e) => {
    e.preventDefault();
    
    if (editingSindico) {
      // aqui serve pra editar o sindico que ja existe
      setSindicos(sindicos.map(s => 
        s.id === editingSindico.id ? {...sindicoData, id: editingSindico.id} : s
      ));
    } else {
      // ou adicionar um novo sindico por aq
      const newSindico = {
        ...sindicoData,
        id: Date.now()
      };
      setSindicos([...sindicos, newSindico]);
    }
    
    setShowCadastrarSindicoModal(false);
    setShowSuccessModal(true);
    setSindicoData({
      nome: "",
      email: "",
      cpf: "",
      condominioResponsavel: ""
    });
    setEditingSindico(null);
  };

  const handleEditCondominio = (condominio) => {
    setCondominioData({
      nome: condominio.nome,
      endereco: condominio.endereco,
      bairro: condominio.bairro,
      quantidadeUnidades: condominio.quantidadeUnidades.toString(),
      sindicoResponsavel: condominio.sindicoResponsavel
    });
    setEditingCondominio(condominio);
    setShowCadastrarCondominioModal(true);
  };

  const handleDeleteCondominio = (id) => {
    setCondominios(condominios.filter(c => c.id !== id));
  };

  const handleEditSindico = (sindico) => {
    setSindicoData({
      nome: sindico.nome,
      email: sindico.email,
      cpf: sindico.cpf,
      condominioResponsavel: sindico.condominioResponsavel
    });
    setEditingSindico(sindico);
    setShowCadastrarSindicoModal(true);
  };

  const handleDeleteSindico = (id) => {
    setSindicos(sindicos.filter(s => s.id !== id));
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <SidebarPorteiro />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderPrefeitura />
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#2C3E50] via-[#1a2633] to-[#0d131a] bg-clip-text text-transparent">
                      Dashboard Prefeitura
                    </h1>
                    <span className="text-sm text-white bg-gradient-to-r from-[#2C3E50] to-[#1a2633] px-4 py-1.5 rounded-full shadow-md">
                      Painel Administrativo
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => setShowCadastrarCondominioModal(true)}
                      className="flex items-center gap-2 bg-[#2C3E50] hover:bg-[#1a2633] text-white px-4 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Building className="w-4 h-4" />
                      Cadastrar Condomínio
                    </button>
                    <button 
                      onClick={() => setShowCadastrarSindicoModal(true)}
                      className="flex items-center gap-2 bg-[#008080] hover:bg-[#006666] text-white px-4 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Users className="w-4 h-4" />
                      Cadastrar Síndico
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4">
                  <div className="bg-blue-100 p-4 rounded-2xl group-hover:bg-blue-200 transition-colors duration-300">
                    <Building className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Condomínios</p>
                    <p className="text-3xl font-bold text-gray-900">{condominios.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4">
                  <div className="bg-green-100 p-4 rounded-2xl group-hover:bg-green-200 transition-colors duration-300">
                    <Users className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Síndicos</p>
                    <p className="text-3xl font-bold text-gray-900">{sindicos.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4">
                  <div className="bg-purple-100 p-4 rounded-2xl group-hover:bg-purple-200 transition-colors duration-300">
                    <CheckCircle className="w-7 h-7 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Ativos</p>
                    <p className="text-3xl font-bold text-gray-900">{condominios.length}</p>
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
                    <p className="text-sm text-gray-600 font-medium">Inativos</p>
                    <p className="text-3xl font-bold text-gray-900">0</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Building className="w-5 h-5 text-[#2C3E50]" />
                  Condomínios Cadastrados
                </h2>
                <button className="text-sm text-[#2C3E50] hover:text-[#1a2633] flex items-center gap-2 bg-[#2C3E50]/10 px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#2C3E50]/20">
                  Ver todos <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endereço</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bairro</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidades</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Síndico</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {condominios.map((condominio) => (
                      <tr key={condominio.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{condominio.nome}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{condominio.endereco}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{condominio.bairro}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{condominio.quantidadeUnidades}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{condominio.sindicoResponsavel}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => handleEditCondominio(condominio)}
                            className="text-[#2C3E50] hover:text-[#1a2633] mr-3"
                          >
                            <Edit className="w-4 h-4 inline mr-1" /> Editar
                          </button>
                          <button 
                            onClick={() => handleDeleteCondominio(condominio.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4 inline mr-1" /> Excluir
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
                  <Users className="w-5 h-5 text-[#2C3E50]" />
                  Síndicos Cadastrados
                </h2>
                <button className="text-sm text-[#2C3E50] hover:text-[#1a2633] flex items-center gap-2 bg-[#2C3E50]/10 px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#2C3E50]/20">
                  Ver todos <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-mail</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condomínio</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sindicos.map((sindico) => (
                      <tr key={sindico.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sindico.nome}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sindico.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sindico.cpf}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sindico.condominioResponsavel}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => handleEditSindico(sindico)}
                            className="text-[#2C3E50] hover:text-[#1a2633] mr-3"
                          >
                            <Edit className="w-4 h-4 inline mr-1" /> Editar
                          </button>
                          <button 
                            onClick={() => handleDeleteSindico(sindico.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4 inline mr-1" /> Excluir
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

      
      {showCadastrarCondominioModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#2C3E50]">
                {editingCondominio ? 'Editar Condomínio' : 'Cadastrar Condomínio'}
              </h3>
              <button onClick={() => {
                setShowCadastrarCondominioModal(false);
                setEditingCondominio(null);
                setCondominioData({
                  nome: "",
                  endereco: "",
                  bairro: "",
                  quantidadeUnidades: "",
                  sindicoResponsavel: ""
                });
              }} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <form onSubmit={handleCondominioSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nome do Condomínio</label>
                <input
                  type="text"
                  value={condominioData.nome}
                  onChange={(e) => setCondominioData({...condominioData, nome: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Endereço</label>
                <input
                  type="text"
                  value={condominioData.endereco}
                  onChange={(e) => setCondominioData({...condominioData, endereco: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Bairro</label>
                <input
                  type="text"
                  value={condominioData.bairro}
                  onChange={(e) => setCondominioData({...condominioData, bairro: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Quantidade de Unidades</label>
                <input
                  type="number"
                  value={condominioData.quantidadeUnidades}
                  onChange={(e) => setCondominioData({...condominioData, quantidadeUnidades: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Síndico Responsável</label>
                <select
                  value={condominioData.sindicoResponsavel}
                  onChange={(e) => setCondominioData({...condominioData, sindicoResponsavel: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                >
                  <option value="">Selecione um síndico</option>
                  {sindicos.map(sindico => (
                    <option key={sindico.id} value={sindico.nome}>{sindico.nome}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCadastrarCondominioModal(false);
                    setEditingCondominio(null);
                    setCondominioData({
                      nome: "",
                      endereco: "",
                      bairro: "",
                      quantidadeUnidades: "",
                      sindicoResponsavel: ""
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#2C3E50] text-white rounded-lg hover:bg-[#1a2633]"
                >
                  {editingCondominio ? 'Salvar Alterações' : 'Cadastrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      
      {showCadastrarSindicoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#2C3E50]">
                {editingSindico ? 'Editar Síndico' : 'Cadastrar Síndico'}
              </h3>
              <button onClick={() => {
                setShowCadastrarSindicoModal(false);
                setEditingSindico(null);
                setSindicoData({
                  nome: "",
                  email: "",
                  cpf: "",
                  condominioResponsavel: ""
                });
              }} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSindicoSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nome Completo</label>
                <input
                  type="text"
                  value={sindicoData.nome}
                  onChange={(e) => setSindicoData({...sindicoData, nome: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">E-mail</label>
                <input
                  type="email"
                  value={sindicoData.email}
                  onChange={(e) => setSindicoData({...sindicoData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">CPF</label>
                <input
                  type="text"
                  value={sindicoData.cpf}
                  onChange={(e) => setSindicoData({...sindicoData, cpf: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Condomínio Responsável</label>
                <select
                  value={sindicoData.condominioResponsavel}
                  onChange={(e) => setSindicoData({...sindicoData, condominioResponsavel: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                >
                  <option value="">Selecione um condomínio</option>
                  {condominios.map(condominio => (
                    <option key={condominio.id} value={condominio.nome}>{condominio.nome}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCadastrarSindicoModal(false);
                    setEditingSindico(null);
                    setSindicoData({
                      nome: "",
                      email: "",
                      cpf: "",
                      condominioResponsavel: ""
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#2C3E50] text-white rounded-lg hover:bg-[#1a2633]"
                >
                  {editingSindico ? 'Salvar Alterações' : 'Cadastrar'}
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
              {editingCondominio || editingSindico ? 'Alterações salvas com sucesso!' : 'Cadastro realizado com sucesso!'}
            </h3>
            <p className="text-gray-600 mb-6">
              {editingCondominio ? 'As informações do condomínio foram atualizadas.' : 
               editingSindico ? 'As informações do síndico foram atualizadas.' :
               'O novo registro foi adicionado ao sistema.'}
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