import { useState } from "react";
import { Edit, Trash2, Eye, Search, User, Mail, Smartphone, Home, Car, Shield, AlertCircle, Plus, Users } from "lucide-react";

export default function ListaDeMoradoresSindi() {
  const [moradores, setMoradores] = useState([
    {
      id: 1,
      nome: "Ana Costa",
      email: "ana.costa@email.com",
      telefone: "(11) 99999-9999",
      cpf: "123.456.789-00",
      apartamento: "302B",
      bloco: "Torre A",
      tipo: "Proprietário",
      veiculo: "HB20 - ABC1D23",
      inadimplente: false
    },
    {
      id: 2,
      nome: "Carlos Mendes",
      email: "carlos.mendes@email.com",
      telefone: "(11) 98888-8888",
      cpf: "987.654.321-00",
      apartamento: "105A",
      bloco: "Torre B",
      tipo: "Locatário",
      veiculo: "Onix - XYZ4E56",
      inadimplente: true
    }
  ]);

  const [searchCpf, setSearchCpf] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(null);
  const [editingMorador, setEditingMorador] = useState(null);
  
  const [moradorData, setMoradorData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    apartamento: "",
    bloco: "",
    tipo: "Proprietário",
    veiculo: ""
  });

  const filteredMoradores = moradores.filter(morador =>
    morador.cpf.includes(searchCpf)
  );

  const handleDelete = (id) => {
    setMoradores(moradores.filter(morador => morador.id !== id));
    setShowDeleteConfirm(null);
  };

  const handleEdit = (morador) => {
    setEditingMorador(morador);
    setMoradorData({
      nome: morador.nome,
      email: morador.email,
      telefone: morador.telefone,
      cpf: morador.cpf,
      apartamento: morador.apartamento,
      bloco: morador.bloco,
      tipo: morador.tipo,
      veiculo: morador.veiculo
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setMoradores(moradores.map(m => 
      m.id === editingMorador.id ? { ...moradorData, id: editingMorador.id, inadimplente: m.inadimplente } : m
    ));
    setEditingMorador(null);
    setMoradorData({
      nome: "",
      email: "",
      telefone: "",
      cpf: "",
      apartamento: "",
      bloco: "",
      tipo: "Proprietário",
      veiculo: ""
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-[#008080]" />
          Lista de Moradores
        </h2>
        
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchCpf}
            onChange={(e) => setSearchCpf(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apartamento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMoradores.map((morador) => (
              <tr key={morador.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{morador.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{morador.cpf}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{morador.apartamento} - {morador.bloco}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{morador.tipo}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    morador.inadimplente ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {morador.inadimplente ? 'Inadimplente' : 'Em dia'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => setShowDetailsModal(morador)}
                    className="text-[#008080] hover:text-[#006666] mr-3"
                    title="Ver detalhes"
                  >
                    <Eye className="w-4 h-4 inline" />
                  </button>
                  <button 
                    onClick={() => handleEdit(morador)}
                    className="text-[#2C3E50] hover:text-[#1a2633] mr-3"
                    title="Editar"
                  >
                    <Edit className="w-4 h-4 inline" />
                  </button>
                  <button 
                    onClick={() => setShowDeleteConfirm(morador.id)}
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
              Tem certeza que deseja excluir este morador? Esta ação não pode ser desfeita.
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
              <h3 className="text-xl font-bold text-[#2C3E50]">Detalhes do Morador</h3>
              <button onClick={() => setShowDetailsModal(null)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-[#008080] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Nome Completo</p>
                  <p className="font-medium text-gray-900">{showDetailsModal.nome}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#008080] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">E-mail</p>
                  <p className="font-medium text-gray-900">{showDetailsModal.email}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-[#008080] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Telefone</p>
                  <p className="font-medium text-gray-900">{showDetailsModal.telefone}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#008080] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">CPF</p>
                  <p className="font-medium text-gray-900">{showDetailsModal.cpf}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Home className="w-5 h-5 text-[#008080] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Apartamento/Bloco</p>
                  <p className="font-medium text-gray-900">{showDetailsModal.apartamento} - {showDetailsModal.bloco}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-[#008080] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Tipo</p>
                  <p className="font-medium text-gray-900">{showDetailsModal.tipo}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Car className="w-5 h-5 text-[#008080] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Veículo</p>
                  <p className="font-medium text-gray-900">{showDetailsModal.veiculo || "Não informado"}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#008080] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Status Financeiro</p>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    showDetailsModal.inadimplente ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {showDetailsModal.inadimplente ? 'Inadimplente' : 'Em dia'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDetailsModal(null)}
                className="px-6 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666]"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      
      {editingMorador && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#2C3E50]">Editar Morador</h3>
              <button onClick={() => setEditingMorador(null)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSaveEdit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nome Completo</label>
                <input
                  type="text"
                  value={moradorData.nome}
                  onChange={(e) => setMoradorData({...moradorData, nome: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">E-mail</label>
                <input
                  type="email"
                  value={moradorData.email}
                  onChange={(e) => setMoradorData({...moradorData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Telefone</label>
                <input
                  type="tel"
                  value={moradorData.telefone}
                  onChange={(e) => setMoradorData({...moradorData, telefone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">CPF</label>
                <input
                  type="text"
                  value={moradorData.cpf}
                  onChange={(e) => setMoradorData({...moradorData, cpf: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  required
                  disabled
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Apartamento</label>
                  <input
                    type="text"
                    value={moradorData.apartamento}
                    onChange={(e) => setMoradorData({...moradorData, apartamento: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Bloco</label>
                  <input
                    type="text"
                    value={moradorData.bloco}
                    onChange={(e) => setMoradorData({...moradorData, bloco: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Tipo</label>
                <select
                  value={moradorData.tipo}
                  onChange={(e) => setMoradorData({...moradorData, tipo: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                >
                  <option value="Proprietário">Proprietário</option>
                  <option value="Locatário">Locatário</option>
                  <option value="Familiar">Familiar</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Veículo</label>
                <input
                  type="text"
                  value={moradorData.veiculo}
                  onChange={(e) => setMoradorData({...moradorData, veiculo: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  placeholder="Modelo e placa do veículo"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingMorador(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666]"
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