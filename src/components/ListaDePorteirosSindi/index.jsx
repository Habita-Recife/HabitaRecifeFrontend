import { useState } from "react";
import { Edit, Trash2, Eye, Search, User, Mail, Smartphone, Shield, AlertCircle, CheckCircle, Calendar } from "lucide-react";

export default function ListaDePorteirosSindi() {
  const [porteiros, setPorteiros] = useState([
    {
      id: 1,
      nome: "Carlos Silva",
      email: "carlos.silva@email.com",
      telefone: "(11) 99999-9999",
      cpf: "123.456.789-00",
      status: "Ativo",
      dataAdmissao: "15/03/2023"
    },
    {
      id: 2,
      nome: "Ana Oliveira",
      email: "ana.oliveira@email.com",
      telefone: "(11) 98888-8888",
      cpf: "987.654.321-00",
      status: "Ativo",
      dataAdmissao: "10/05/2023"
    }
  ]);

  const [searchCpf, setSearchCpf] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(null);
  const [editingPorteiro, setEditingPorteiro] = useState(null);
  
  const [porteiroData, setPorteiroData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    status: "Ativo",
    dataAdmissao: ""
  });

  const filteredPorteiros = porteiros.filter(porteiro =>
    porteiro.cpf.includes(searchCpf)
  );

  const handleDelete = (id) => {
    setPorteiros(porteiros.filter(porteiro => porteiro.id !== id));
    setShowDeleteConfirm(null);
  };

  const handleEdit = (porteiro) => {
    setEditingPorteiro(porteiro);
    setPorteiroData({
      nome: porteiro.nome,
      email: porteiro.email,
      telefone: porteiro.telefone,
      cpf: porteiro.cpf,
      status: porteiro.status,
      dataAdmissao: porteiro.dataAdmissao
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setPorteiros(porteiros.map(p => 
      p.id === editingPorteiro.id ? { ...porteiroData, id: editingPorteiro.id } : p
    ));
    setEditingPorteiro(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#2C3E50]" />
          Lista de Porteiros
        </h2>
        
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchCpf}
            onChange={(e) => setSearchCpf(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2C3E50] focus:border-transparent"
            placeholder="Buscar por CPF"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admissão</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPorteiros.map((porteiro) => (
              <tr key={porteiro.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{porteiro.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{porteiro.cpf}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{porteiro.telefone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    porteiro.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {porteiro.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{porteiro.dataAdmissao}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => setShowDetailsModal(porteiro)}
                    className="text-[#2C3E50] hover:text-[#1a2633] mr-3"
                    title="Ver detalhes"
                  >
                    <Eye className="w-4 h-4 inline" />
                  </button>
                  <button 
                    onClick={() => handleEdit(porteiro)}
                    className="text-[#2C3E50] hover:text-[#1a2633] mr-3"
                    title="Editar"
                  >
                    <Edit className="w-4 h-4 inline" />
                  </button>
                  <button 
                    onClick={() => setShowDeleteConfirm(porteiro.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full text-center">
            <div className="mb-4">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Confirmar Exclusão</h3>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir este porteiro? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}

      
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#2C3E50]">Detalhes do Porteiro</h3>
              <button onClick={() => setShowDetailsModal(null)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-[#2C3E50] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Nome Completo</p>
                  <p className="font-medium text-gray-900">{showDetailsModal.nome}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#2C3E50] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">E-mail</p>
                  <p className="font-medium text-gray-900">{showDetailsModal.email}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-[#2C3E50] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Telefone</p>
                  <p className="font-medium text-gray-900">{showDetailsModal.telefone}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#2C3E50] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">CPF</p>
                  <p className="font-medium text-gray-900">{showDetailsModal.cpf}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#2C3E50] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    showDetailsModal.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {showDetailsModal.status}
                  </span>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#2C3E50] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Data de Admissão</p>
                  <p className="font-medium text-gray-900">{showDetailsModal.dataAdmissao}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDetailsModal(null)}
                className="px-6 py-2 bg-[#2C3E50] text-white rounded-lg hover:bg-[#1a2633]"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      
      {editingPorteiro && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#2C3E50]">Editar Porteiro</h3>
              <button onClick={() => setEditingPorteiro(null)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSaveEdit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nome Completo</label>
                <input
                  type="text"
                  value={porteiroData.nome}
                  onChange={(e) => setPorteiroData({...porteiroData, nome: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">E-mail</label>
                <input
                  type="email"
                  value={porteiroData.email}
                  onChange={(e) => setPorteiroData({...porteiroData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Telefone</label>
                <input
                  type="tel"
                  value={porteiroData.telefone}
                  onChange={(e) => setPorteiroData({...porteiroData, telefone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">CPF</label>
                <input
                  type="text"
                  value={porteiroData.cpf}
                  onChange={(e) => setPorteiroData({...porteiroData, cpf: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  required
                  disabled
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Status</label>
                <select
                  value={porteiroData.status}
                  onChange={(e) => setPorteiroData({...porteiroData, status: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Data de Admissão</label>
                <input
                  type="text"
                  value={porteiroData.dataAdmissao}
                  onChange={(e) => setPorteiroData({...porteiroData, dataAdmissao: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingPorteiro(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#2C3E50] text-white rounded-lg hover:bg-[#1a2633]"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}