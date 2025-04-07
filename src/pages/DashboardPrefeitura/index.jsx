import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderPrefeitura from "../../components/HeaderPrefeitura";
import { Building, Users, Edit, Trash2, CheckCircle } from "lucide-react";
import { cadastrarCondominio, listarCondominios, editarCondominio, excluirCondominio, cadastrarSindico, listarSindicos, editarSindico, excluirSindico } from "../../utils/api";
import { getDados } from "../../utils/utils";
import InputRG from "../../components/InputRG";
import InputTelefone from "../../components/InputTelefone";

export function DashboardPrefeitura() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const dadosUsuario = getDados(token);

      if(dadosUsuario.roles[0] != 'ROLE_PREFEITURA') {
        navigate('/login');
      } 
    } else {
      navigate('/login');
    }
    
  }, []);
  
  const [showCadastrarCondominioModal, setShowCadastrarCondominioModal] = useState(false);
  const [showCadastrarSindicoModal, setShowCadastrarSindicoModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [editingCondominio, setEditingCondominio] = useState(null);
  const [editingSindico, setEditingSindico] = useState(null);
  const [condominios, setCondominios] = useState([]);
  const [sindicos, setSindicos] = useState([]);
  
  const [condominioData, setCondominioData] = useState({
    nomeCondominio: "",
    enderecoCondominio: "",
    numeroApartamento: "",
    numeroBloco: "",
    nomeSindico: ""
  });

  const [sindicoData, setSindicoData] = useState({
    idCondominio: "",
    nomeSindico: "",
    emailSindico: "",
    telefoneSindico: "",
    rgSindico: ""
  });

  useEffect(() => {
    listarCondominios().then((response) => {
      setCondominios(response.data);
    });
  }, []);

  useEffect(() => {
    listarSindicos().then((response) => {
      setSindicos(response.data);
    });
  }, []);

  const handleCondominioSubmit = (e) => {
    e.preventDefault();
    
    if (editingCondominio) {
      let condominioEditado = {};
      condominios.forEach((condominio) => {
        if (condominio.idCondominio === editingCondominio.idCondominio) {
          condominioEditado = {...condominioData, idCondominio: editingCondominio.idCondominio};
        } 
      });
      editarCondominio(editingCondominio.idCondominio, condominioEditado).then((response) => {
        setShowSuccessModal(true);
        setCondominios(condominios.map(c => 
          c.idCondominio === editingCondominio.idCondominio ? {...condominioData, idCondominio: editingCondominio.idCondominio} : c
        ));
      }); 
    } else {
      cadastrarCondominio(condominioData).then((response) => {
        const newCondominio = {
          ...condominioData,
          idCondominio: response.data.idCondominio,
          numeroApartamento: parseInt(condominioData.numeroApartamento),
          numeroBloco: parseInt(condominioData.numeroBloco)
        };
        
        setCondominios([...condominios, newCondominio]);
        setShowSuccessModal(true);
      });  
    }
    
    setShowCadastrarCondominioModal(false);
    setCondominioData({
      nomeCondominio: "",
      enderecoCondominio: "",
      numeroApartamento: "",
      numeroBloco: ""
    });
    setEditingCondominio(null);
  };

  const handleSindicoSubmit = (e) => {
    e.preventDefault();
    
    if (editingSindico) {
      let sindicoEditado = {};
      sindicos.forEach((sindico) => {
        if (sindico.id_sindico === editingSindico.id_sindico) {
          sindicoEditado = {...sindicoData, id_sindico: editingSindico.id_sindico};
        } 
      });
      editarSindico(editingSindico.id_sindico, sindicoEditado).then((response) => {
        setShowSuccessModal(true);
        setSindicos(sindicos.map(s => 
          s.id_sindico === editingSindico.id_sindico ? {...sindicoData, id_sindico: editingSindico.id_sindico} : s
        ));
      }); 
      
    } else {
      cadastrarSindico(sindicoData).then((response) => {
        const newSindico = {
          ...sindicoData,
          id_sindico: response.data.id_sindico
        };
        setSindicos([...sindicos, newSindico]);
        setShowSuccessModal(true);
      }); 

    }
    
    setShowCadastrarSindicoModal(false);
    setShowSuccessModal(true);
    setSindicoData({
      idCondominio: "",
      nomeSindico: "",
      emailSindico: "",
      telefoneSindico: "",
      rgSindico: ""
    });
    setEditingSindico(null);
  };

  const handleEditCondominio = (condominio) => {
    setCondominioData({
      nomeCondominio: condominio.nomeCondominio,
      enderecoCondominio: condominio.enderecoCondominio,
      numeroApartamento: condominio.numeroApartamento.toString(),
      numeroBloco: condominio.numeroBloco.toString()
    });
    setEditingCondominio(condominio);
    setShowCadastrarCondominioModal(true);
  };

  const handleDeleteCondominio = (idCondominio) => {
    excluirCondominio(idCondominio).then((response) => {
      setCondominios(condominios.filter(c => c.idCondominio !== idCondominio));
    }); 
  };

  const handleEditSindico = (sindico) => {
    setSindicoData({
      idCondominio: sindico.idCondominio,
      nomeSindico: sindico.nomeSindico,
      emailSindico: sindico.emailSindico,
      telefoneSindico: sindico.telefoneSindico,
      rgSindico: sindico.rgSindico
    });
    setEditingSindico(sindico);
    setShowCadastrarSindicoModal(true);
  };

  const handleDeleteSindico = (id_sindico) => {
    excluirSindico(id_sindico).then((response) => {
      setSindicos(sindicos.filter(s => s.id_sindico !== id_sindico));
    }); 
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderPrefeitura />
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                  <h1 className="text-4xl sm:text-5xl font-bold text-[#008080]">
                    Dashboard
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
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
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Building className="w-5 h-5 text-[#2C3E50]" />
                  Condomínios Cadastrados
                </h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endereço</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apartamentos</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blocos</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Síndico</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {condominios.map((condominio) => (
                      <tr key={condominio.idCondominio} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{condominio.nomeCondominio}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{condominio.enderecoCondominio}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{condominio.numeroApartamento}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{condominio.numeroBloco}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{condominio.sindico != null ? condominio.sindico.nomeSindico : ''}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => handleEditCondominio(condominio)}
                            className="text-[#2C3E50] hover:text-[#1a2633] mr-3"
                          >
                            <Edit className="w-4 h-4 inline mr-1" /> Editar
                          </button>
                          <button 
                            onClick={() => handleDeleteCondominio(condominio.idCondominio)}
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
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-mail</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RG</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sindicos.map((sindico) => (
                      <tr key={sindico.id_sindico} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sindico.nomeSindico}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sindico.emailSindico}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sindico.telefoneSindico}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sindico.rgSindico}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => handleEditSindico(sindico)}
                            className="text-[#2C3E50] hover:text-[#1a2633] mr-3"
                          >
                            <Edit className="w-4 h-4 inline mr-1" /> Editar
                          </button>
                          <button 
                            onClick={() => handleDeleteSindico(sindico.id_sindico)}
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
                  nomeCondominio: "",
                  enderecoCondominio: "",
                  numeroApartamento: "",
                  numeroBloco: ""
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
                  value={condominioData.nomeCondominio}
                  onChange={(e) => setCondominioData({...condominioData, nomeCondominio: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Endereço Completo</label>
                <input
                  type="text"
                  value={condominioData.enderecoCondominio}
                  onChange={(e) => setCondominioData({...condominioData, enderecoCondominio: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  required
                />
              </div>

              {editingCondominio === null && (
                <div>
                  <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Número de Apartamentos</label>
                  <input
                    type="number"
                    value={condominioData.numeroApartamento}
                    onChange={(e) => setCondominioData({...condominioData, numeroApartamento: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                    required
                  />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Número de Blocos</label>
                    <input
                      type="number"
                      value={condominioData.numeroBloco}
                      onChange={(e) => setCondominioData({...condominioData, numeroBloco: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                      required
                    />
                  </div>
                </div>
              )}
              

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCadastrarCondominioModal(false);
                    setEditingCondominio(null);
                    setCondominioData({
                      nomeCondominio: "",
                      enderecoCondominio: "",
                      numeroApartamento: "",
                      numeroBloco: ""
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
                  idCondominio: "",
                  nomeSindico: "",
                  emailSindico: "",
                  telefoneSindico: "",
                  rgSindico: ""
                });
              }} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSindicoSubmit}>
              {editingSindico === null && (
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Condomínio</label>
                  <select
                    value={sindicoData.idCondominio}
                    onChange={(e) => setSindicoData({...sindicoData, idCondominio: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                    required
                  >
                    <option value="">Selecione um condomínio</option>
                    {condominios.map(condominio => (
                      <option key={condominio.idCondominio} value={condominio.idCondominio}>{condominio.nomeCondominio}</option>
                    ))}
                  </select>
                </div>
              )}
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nome do Síndico</label>
                <input
                  type="text"
                  value={sindicoData.nomeSindico}
                  onChange={(e) => setSindicoData({...sindicoData, nomeSindico: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">E-mail</label>
                <input
                  type="email"
                  value={sindicoData.emailSindico}
                  onChange={(e) => setSindicoData({...sindicoData, emailSindico: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Telefone</label>
                <InputTelefone
                  value={sindicoData.telefoneSindico}
                  onChange={(val) => setSindicoData({ ...sindicoData, telefoneSindico: val })}
                />
              </div>

              {editingSindico === null && (
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">RG</label>
                  <InputRG
                    value={sindicoData.rgSindico}
                    onChange={(val) => setSindicoData({ ...sindicoData, rgSindico: val })}
                  />
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCadastrarSindicoModal(false);
                    setEditingSindico(null);
                    setSindicoData({
                      condominioResponsavel: "",
                      nome: "",
                      email: "",
                      telefone: "",
                      cpf: ""
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