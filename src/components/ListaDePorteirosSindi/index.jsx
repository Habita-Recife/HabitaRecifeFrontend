import { useState, useEffect } from "react";
import { Edit, Trash2, Eye, Search, User, Mail, Shield, AlertCircle} from "lucide-react";
import { listarPorteiros, editarPorteiro, excluirPorteiro } from "../../utils/api";

export default function ListaDePorteirosSindi() {
  const [porteiros, setPorteiros] = useState([]);
  const [searchCpf, setSearchCpf] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(null);
  const [editingPorteiro, setEditingPorteiro] = useState(null);
  
  const [porteiroData, setPorteiroData] = useState({
    nomePorteiro: "",
    emailPorteiro: "",
    cpfPorteiro: ""
  });

  useEffect(() => {
    listarPorteiros().then((response) => {
      setPorteiros(response.data);
    });
  }, []);

  const filteredPorteiros = porteiros.filter(porteiro =>
    porteiro.cpfPorteiro.includes(searchCpf)
  );

  const handleDelete = (idPorteiro) => {
    excluirPorteiro(idPorteiro).then((response) => {
      setPorteiros(porteiros.filter(porteiro => porteiro.idPorteiro !== idPorteiro));
      setShowDeleteConfirm(null);
    }); 
  };

  const handleEdit = (porteiro) => {
    setEditingPorteiro(porteiro);
    setPorteiroData({
      nomePorteiro: porteiro.nomePorteiro,
      emailPorteiro: porteiro.emailPorteiro,
      cpfPorteiro: porteiro.cpfPorteiro
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();

    let porteiroEditado = {};
    porteiros.forEach((porteiro) => {
      if (porteiro.idPorteiro === editingPorteiro.idPorteiro) {
        porteiroEditado = {...porteiroData, idPorteiro: editingPorteiro.idPorteiro};
      } 
    });

    editarPorteiro(editingPorteiro.idPorteiro, porteiroEditado).then((response) => {
      setPorteiros(porteiros.map(p => 
        p.idPorteiro === editingPorteiro.idPorteiro ? { ...porteiroData, idPorteiro: editingPorteiro.idPorteiro } : p
      ));
      setEditingPorteiro(null);
      setPorteiroData({
        nomePorteiro: "",
        emailPorteiro: "",
        cpfPorteiro: ""
      });      
    }); 
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-mail</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPorteiros.map((porteiro) => (
              <tr key={porteiro.idPorteiro} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{porteiro.nomePorteiro}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{porteiro.cpfPorteiro}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{porteiro.emailPorteiro}</td>
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
                    onClick={() => setShowDeleteConfirm(porteiro.idPorteiro)}
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
                  <p className="font-medium text-gray-900">{showDetailsModal.nomePorteiro}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#2C3E50] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">E-mail</p>
                  <p className="font-medium text-gray-900">{showDetailsModal.emailPorteiro}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#2C3E50] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">CPF</p>
                  <p className="font-medium text-gray-900">{showDetailsModal.cpfPorteiro}</p>
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
                  value={porteiroData.nomePorteiro}
                  onChange={(e) => setPorteiroData({...porteiroData, nomePorteiro: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">E-mail</label>
                <input
                  type="email"
                  value={porteiroData.emailPorteiro}
                  onChange={(e) => setPorteiroData({...porteiroData, emailPorteiro: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">CPF</label>
                <input
                  type="text"
                  value={porteiroData.cpfPorteiro}
                  onChange={(e) => setPorteiroData({...porteiroData, cpfPorteiro: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  required
                  disabled
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