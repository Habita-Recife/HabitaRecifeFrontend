import { useState } from "react";
import HeaderSindi from "../../components/HeaderSindi";
import SidebarSindi from "../../components/SideBarSindi";
import { User, Home, Phone, Users, FileText, Edit, ChevronRight, CheckCircle, XCircle } from "lucide-react";

export function MoradoresSindi() {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showPaymentsModal, setShowPaymentsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);
  const [editData, setEditData] = useState({});
  const [residents, setResidents] = useState([
    {
      id: 1,
      name: "Ana Costa",
      apartment: "302",
      block: "B",
      phone: "(81) 98765-4321",
      familyMembers: [
        { name: "Carlos Costa", relation: "Cônjuge" },
        { name: "Lucas Costa", relation: "Filho", age: 12 }
      ],
      payments: [
        { month: "Janeiro 2025", status: "Pago", amount: 500 },
        { month: "Fevereiro 2025", status: "Pago", amount: 500 },
        { month: "Março 2025", status: "Pendente", amount: 500 }
      ]
    },
    {
      id: 2,
      name: "João Silva",
      apartment: "105",
      block: "A",
      phone: "(81) 91234-5678",
      familyMembers: [
        { name: "Maria Silva", relation: "Cônjuge" },
        { name: "Pedro Silva", relation: "Filho", age: 8 },
        { name: "Sofia Silva", relation: "Filha", age: 5 }
      ],
      payments: [
        { month: "Janeiro 2025", status: "Pago", amount: 500 },
        { month: "Fevereiro 2025", status: "Atrasado", amount: 500 },
        { month: "Março 2025", status: "Atrasado", amount: 500 }
      ]
    },
    {
      id: 3,
      name: "Roberto Alves",
      apartment: "403",
      block: "C",
      phone: "(81) 99876-5432",
      familyMembers: [],
      payments: [
        { month: "Janeiro 2025", status: "Pago", amount: 500 },
        { month: "Fevereiro 2025", status: "Pago", amount: 500 },
        { month: "Março 2025", status: "Pago", amount: 500 }
      ]
    }
  ]);

  const handleViewDetails = (resident) => {
    setSelectedResident(resident);
    setShowDetailsModal(true);
  };

  const handleViewPayments = (resident) => {
    setSelectedResident(resident);
    setShowPaymentsModal(true);
  };

  const handleEdit = (resident) => {
    setSelectedResident(resident);
    setEditData({
      name: resident.name,
      phone: resident.phone,
      apartment: resident.apartment,
      block: resident.block
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    const updatedResidents = residents.map(resident => 
      resident.id === selectedResident.id 
        ? { ...resident, ...editData }
        : resident
    );
    setResidents(updatedResidents);
    setShowEditModal(false);
    setShowSuccessModal(true);
  };

  const getPaymentStatus = (payments) => {
    const latePayments = payments.filter(p => p.status === "Atrasado" || p.status === "Pendente");
    return latePayments.length > 0 ? "Inadimplente" : "Em dia";
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarSindi />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderSindi />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Users className="text-[#008080]" />
              Gestão de Moradores
            </h1>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apartamento</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bloco</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pagamentos</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {residents.map((resident) => (
                    <tr key={resident.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="w-5 h-5 text-gray-500 mr-2" />
                          <span className="font-medium">{resident.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Home className="w-5 h-5 text-gray-500 mr-2" />
                          <span>{resident.apartment}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{resident.block}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        <div className="flex items-center">
                          <Phone className="w-5 h-5 text-gray-500 mr-2" />
                          <span>{resident.phone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          getPaymentStatus(resident.payments) === "Inadimplente" 
                            ? "bg-red-100 text-red-800" 
                            : "bg-green-100 text-green-800"
                        }`}>
                          {getPaymentStatus(resident.payments)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => handleViewDetails(resident)}
                          className="text-[#008080] hover:text-[#006666] mr-3 flex items-center"
                        >
                          <ChevronRight size={16} className="mr-1" /> Detalhes
                        </button>
                        <button 
                          onClick={() => handleViewPayments(resident)}
                          className="text-blue-600 hover:text-blue-800 mr-3 flex items-center"
                        >
                          <FileText size={16} className="mr-1" /> Pagamentos
                        </button>
                        <button 
                          onClick={() => handleEdit(resident)}
                          className="text-gray-600 hover:text-gray-900 flex items-center"
                        >
                          <Edit size={16} className="mr-1" /> Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {showDetailsModal && selectedResident && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Detalhes do Morador</h3>
                  <button onClick={() => setShowDetailsModal(false)} className="text-gray-500 hover:text-gray-700">
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-700 font-medium">Nome:</p>
                    <p className="text-gray-600">{selectedResident.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 font-medium">Apartamento:</p>
                    <p className="text-gray-600">{selectedResident.apartment} - Bloco {selectedResident.block}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 font-medium">Telefone:</p>
                    <p className="text-gray-600">{selectedResident.phone}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 font-medium">Família:</p>
                    {selectedResident.familyMembers.length > 0 ? (
                      <ul className="list-disc pl-5 text-gray-600">
                        {selectedResident.familyMembers.map((member, index) => (
                          <li key={index}>
                            {member.name} ({member.relation}{member.age ? `, ${member.age} anos` : ''})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">Nenhum familiar cadastrado</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="px-6 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666]"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          )}

          {showPaymentsModal && selectedResident && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Pagamentos de {selectedResident.name}</h3>
                  <button onClick={() => setShowPaymentsModal(false)} className="text-gray-500 hover:text-gray-700">
                    ✕
                  </button>
                </div>
                
                <div className="space-y-3">
                  {selectedResident.payments.map((payment, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium">{payment.month}</p>
                        <p className="text-sm text-gray-600">R$ {payment.amount.toFixed(2)}</p>
                      </div>
                      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        payment.status === "Pago" 
                          ? "bg-green-100 text-green-800" 
                          : payment.status === "Atrasado" 
                            ? "bg-red-100 text-red-800" 
                            : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {payment.status === "Pago" ? <CheckCircle size={14} /> : <XCircle size={14} />}
                        {payment.status}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Status atual: <strong>{getPaymentStatus(selectedResident.payments)}</strong>
                  </span>
                  <button
                    onClick={() => setShowPaymentsModal(false)}
                    className="px-6 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666]"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          )}

          {showEditModal && selectedResident && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Editar Morador</h3>
                  <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Nome</label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({...editData, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Telefone</label>
                    <input
                      type="text"
                      value={editData.phone}
                      onChange={(e) => setEditData({...editData, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Apartamento</label>
                      <input
                        type="text"
                        value={editData.apartment}
                        onChange={(e) => setEditData({...editData, apartment: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Bloco</label>
                      <input
                        type="text"
                        value={editData.block}
                        onChange={(e) => setEditData({...editData, block: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-6 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666]"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </div>
            </div>
          )}

          {showSuccessModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-md w-full text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Perfil atualizado com sucesso!</h3>
                <p className="text-gray-600 mb-6">As alterações foram salvas no sistema.</p>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="px-6 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666]"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}