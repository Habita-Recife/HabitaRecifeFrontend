import { useState } from "react";
import HeaderSindi from "../../components/HeaderSindi";
import SidebarSindi from "../../components/SideBarSindi";
import { MessageSquare, Check, X, ChevronRight, Send, User, Home, Clock } from "lucide-react";

export function NotificacoesSindi() {
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [requests, setRequests] = useState([
    {
      id: 1,
      morador: "Ana Costa",
      apartamento: "302B",
      tipo: "Manutenção",
      descricao: "Vazamento no banheiro do apartamento 302B",
      data: "15/03/2025 14:30",
      status: "pendente",
      resposta: ""
    },
    {
      id: 2,
      morador: "Carlos Mendes",
      apartamento: "105A",
      tipo: "Sugestão",
      descricao: "Instalar bicicletário coberto na área comum",
      data: "10/03/2025 09:15",
      status: "respondido",
      resposta: "Sugestão aprovada em reunião. Será implementada no próximo mês."
    },
    {
      id: 3,
      morador: "Roberto Alves",
      apartamento: "403C",
      tipo: "Reclamação",
      descricao: "Barulho excessivo após 22h no apartamento vizinho",
      data: "05/03/2025 22:45",
      status: "respondido",
      resposta: "Notificação enviada ao morador. Favor registrar novas ocorrências."
    },
    {
      id: 4,
      morador: "Maria Oliveira",
      apartamento: "201A",
      tipo: "Solicitação",
      descricao: "Liberação de chave reserva para visita",
      data: "18/03/2025 10:00",
      status: "pendente",
      resposta: ""
    }
  ]);

  const handleOpenResponse = (request) => {
    setSelectedRequest(request);
    setShowResponseModal(true);
  };

  const handleSendResponse = () => {
    if (!responseText.trim()) return;
    
    const updatedRequests = requests.map(req => 
      req.id === selectedRequest.id 
        ? { ...req, status: "respondido", resposta: responseText }
        : req
    );
    
    setRequests(updatedRequests);
    setResponseText("");
    setShowResponseModal(false);
  };

  const pendingRequests = requests.filter(req => req.status === "pendente");
  const answeredRequests = requests.filter(req => req.status === "respondido");

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarSindi />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderSindi />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-gray-800 pl-6 pt-4 pb-2">
              Notificações e Solicitações
            </h1>

            {/* essa eh a parte das solicitacoes para responder, tudo estatico por enquanto */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Clock className="text-orange-500" />
                Solicitações para Responder
              </h2>
              
              {pendingRequests.length > 0 ? (
                <div className="space-y-4">
                  {pendingRequests.map(request => (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">{request.morador} - {request.apartamento}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Home className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{request.tipo}</span>
                          </div>
                          <p className="text-gray-700">{request.descricao}</p>
                          <p className="text-xs text-gray-500 mt-2">{request.data}</p>
                        </div>
                        <button 
                          onClick={() => handleOpenResponse(request)}
                          className="flex items-center gap-1 px-4 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666] transition-colors"
                        >
                          <MessageSquare size={16} /> Responder
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">Nenhuma solicitação pendente</p>
              )}
            </div>

            {/* o historico de respostas, tudo estatico por enquanto  como sempre*/}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Check className="text-green-500" />
                Histórico de Respostas
              </h2>
              {/* mermao n sei como vai ser quando conectar com o back */}
              {answeredRequests.length > 0 ? (
                <div className="space-y-4">
                  {answeredRequests.map(request => (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">{request.morador} - {request.apartamento}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Home className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{request.tipo}</span>
                          </div>
                        </div>
                        <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          <Check size={14} /> Respondido
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-gray-700 font-medium">Solicitação:</p>
                        <p className="text-gray-600">{request.descricao}</p>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p className="text-gray-700 font-medium">Resposta:</p>
                        <p className="text-gray-600">{request.resposta}</p>
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-2">{request.data}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">Nenhuma resposta registrada</p>
              )}
            </div>
          </div>

          {/* esse eh o modal de resposta minha gente*/}
          {showResponseModal && selectedRequest && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Responder Solicitação</h3>
                  <button 
                    onClick={() => setShowResponseModal(false)} 
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Morador:</span> {selectedRequest.morador} - {selectedRequest.apartamento}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Tipo:</span> {selectedRequest.tipo}
                  </p>
                  <p className="text-gray-700 mb-3">
                    <span className="font-medium">Solicitação:</span> {selectedRequest.descricao}
                  </p>
                  
                  <label className="block text-gray-700 mb-2">Sua Resposta:</label>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] h-32"
                    placeholder="Digite sua resposta aqui..."
                  />
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowResponseModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSendResponse}
                    className="flex items-center gap-2 px-6 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666]"
                  >
                    <Send size={16} /> Enviar Resposta
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