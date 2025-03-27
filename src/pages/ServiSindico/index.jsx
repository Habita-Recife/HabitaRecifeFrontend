import { useState } from "react";
import HeaderSindi from "../../components/HeaderSindi";
import SidebarSindi from "../../components/SideBarSindi";
import { ClipboardList, CheckCircle, Clock, User, Phone, Briefcase, Home, ChevronRight, XCircle } from "lucide-react";

export function ServiSindico() {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [services, setServices] = useState({
    pending: [
      {
        id: 1,
        name: "João Silva",
        service: "Encanador",
        phone: "(81) 98765-4321",
        type: "Morador",
        contract: "Prestação de serviços esporádicos",
        status: "pending"
      },
      {
        id: 2,
        name: "Construções Recife Ltda",
        service: "Pintura",
        phone: "(81) 3344-5566",
        type: "Terceirizada",
        contract: "Contrato anual com 3 meses de garantia",
        status: "pending"
      }
    ],
    inProgress: [
      {
        id: 3,
        name: "Maria Oliveira",
        service: "Limpeza",
        phone: "(81) 91234-5678",
        type: "Morador",
        contract: "Serviços semanais",
        status: "in-progress"
      }
    ],
    completed: [
      {
        id: 4,
        name: "Carlos Mendes",
        service: "Elétrica",
        phone: "(81) 99876-5432",
        type: "Morador",
        contract: "Serviço pontual realizado",
        status: "completed"
      }
    ]
  });

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setShowRequestModal(true);
  };

  const handleApprove = () => {
    const updatedPending = services.pending.filter(req => req.id !== selectedRequest.id);
    const updatedInProgress = [...services.inProgress, { ...selectedRequest, status: "in-progress" }];
    
    setServices({
      ...services,
      pending: updatedPending,
      inProgress: updatedInProgress
    });
    setShowRequestModal(false);
  };

  const handleReject = () => {
    const updatedPending = services.pending.filter(req => req.id !== selectedRequest.id);
    
    setServices({
      ...services,
      pending: updatedPending
    });
    setShowRequestModal(false);
  };

  const handleCompleteService = (id) => {
    const service = services.inProgress.find(s => s.id === id);
    const updatedInProgress = services.inProgress.filter(s => s.id !== id);
    const updatedCompleted = [...services.completed, { ...service, status: "completed" }];
    
    setServices({
      ...services,
      inProgress: updatedInProgress,
      completed: updatedCompleted
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarSindi />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderSindi />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <ClipboardList className="text-[#008080]" />
              Gestão de Serviços
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Serviços Pendentes */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Clock className="text-yellow-500" />
                  Solicitações Pendentes
                  <span className="ml-auto bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                    {services.pending.length}
                  </span>
                </h2>
                
                {services.pending.length > 0 ? (
                  <div className="space-y-4">
                    {services.pending.map(request => (
                      <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{request.name}</h3>
                            <p className="text-sm text-gray-600">{request.service}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Phone className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{request.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              {request.type === "Morador" ? (
                                <User className="w-4 h-4 text-blue-500" />
                              ) : (
                                <Briefcase className="w-4 h-4 text-green-500" />
                              )}
                              <span className="text-xs text-gray-500">{request.type}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleViewRequest(request)}
                            className="flex items-center gap-1 px-3 py-1 bg-[#008080] text-white rounded-lg hover:bg-[#006666] text-sm"
                          >
                            <ChevronRight size={14} /> Analisar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">Nenhuma solicitação pendente</p>
                )}
              </div>

              {/* Serviços em Andamento */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Clock className="text-blue-500" />
                  Serviços em Andamento
                  <span className="ml-auto bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {services.inProgress.length}
                  </span>
                </h2>
                
                {services.inProgress.length > 0 ? (
                  <div className="space-y-4">
                    {services.inProgress.map(service => (
                      <div key={service.id} className="border border-blue-200 rounded-lg p-4 bg-blue-50 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{service.name}</h3>
                            <p className="text-sm text-gray-600">{service.service}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Phone className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{service.phone}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleCompleteService(service.id)}
                            className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
                          >
                            <CheckCircle size={14} /> Concluir
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">Nenhum serviço em andamento</p>
                )}
              </div>

              {/* Histórico de Serviços */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="text-green-500" />
                  Histórico de Serviços
                  <span className="ml-auto bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {services.completed.length}
                  </span>
                </h2>
                
                {services.completed.length > 0 ? (
                  <div className="space-y-4">
                    {services.completed.map(service => (
                      <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{service.name}</h3>
                            <p className="text-sm text-gray-600">{service.service}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Phone className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{service.phone}</span>
                            </div>
                          </div>
                          <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            <CheckCircle size={14} /> Concluído
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">Nenhum serviço concluído</p>
                )}
              </div>
            </div>
          </div>

          {/* Modal de Análise de Solicitação */}
          {showRequestModal && selectedRequest && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Análise de Solicitação</h3>
                  <button 
                    onClick={() => setShowRequestModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-700 font-medium">Nome:</p>
                    <p className="text-gray-600">{selectedRequest.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 font-medium">Serviço:</p>
                    <p className="text-gray-600">{selectedRequest.service}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 font-medium">Telefone:</p>
                    <p className="text-gray-600">{selectedRequest.phone}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 font-medium">Tipo:</p>
                    <p className="text-gray-600 flex items-center gap-2">
                      {selectedRequest.type === "Morador" ? (
                        <>
                          <User className="w-5 h-5 text-blue-500" />
                          <span>Morador do condomínio</span>
                        </>
                      ) : (
                        <>
                          <Briefcase className="w-5 h-5 text-green-500" />
                          <span>Empresa terceirizada</span>
                        </>
                      )}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 font-medium">Resumo do Contrato:</p>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedRequest.contract}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={handleReject}
                    className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <XCircle size={16} /> Recusar
                  </button>
                  <button
                    onClick={handleApprove}
                    className="flex items-center gap-2 px-6 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666]"
                  >
                    <CheckCircle size={16} /> Aceitar
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}