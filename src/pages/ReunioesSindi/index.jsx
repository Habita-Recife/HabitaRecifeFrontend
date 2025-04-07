import { useState } from "react";
import HeaderSindi from "../../components/HeaderSindi";
import SidebarSindi from "../../components/SideBarSindi";
import { Calendar, Plus, Clock, Users, ClipboardList, MapPin, ChevronRight } from "lucide-react";

export function ReunioesSindi() {
  const [showNewMeetingModal, setShowNewMeetingModal] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: "",
    date: "",
    time: "",
    location: "Salão de Festas",
    agenda: ""
  });
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: "Assembleia Geral Ordinária",
      date: "15/04/2025",
      time: "19:00",
      location: "Salão de Festas",
      agenda: "Prestação de contas, eleição da nova diretoria, aprovação do regimento interno"
    },
    {
      id: 2,
      title: "Reunião de Manutenção",
      date: "22/04/2025",
      time: "09:00",
      location: "Área Gourmet",
      agenda: "Discussão sobre reforma do elevador e pintura das áreas comuns"
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeeting({ ...newMeeting, [name]: value });
  };

  const handleSubmitMeeting = (e) => {
    e.preventDefault();
    const meeting = {
      id: meetings.length + 1,
      ...newMeeting
    };
    setMeetings([...meetings, meeting]);
    setNewMeeting({
      title: "",
      date: "",
      time: "",
      location: "Salão de Festas",
      agenda: ""
    });
    setShowNewMeetingModal(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarSindi />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderSindi />
        
        <main className="fflex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-[#008080]">
                Reuniões do Condomínio
              </h1>
              <button
                onClick={() => setShowNewMeetingModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666] transition-colors"
              >
                <Plus size={18} /> Nova Reunião
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {meetings.map((meeting) => (
                <div key={meeting.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-gray-800">{meeting.title}</h2>
                    <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      <Clock size={14} /> {meeting.time}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={16} className="text-[#008080]" />
                      <span>{meeting.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} className="text-[#008080]" />
                      <span>{meeting.location}</span>
                    </div>
                    
                    <div className="mt-4">
                      <h3 className="font-medium text-gray-700 flex items-center gap-2 mb-2">
                        <ClipboardList size={16} className="text-[#008080]" />
                        Pauta da Reunião:
                      </h3>
                      <p className="text-gray-600">{meeting.agenda}</p>
                    </div>
                  </div>
                  
                  <button className="mt-4 flex items-center gap-1 text-[#008080] hover:text-[#006666]">
                    <ChevronRight size={18} /> Ver detalhes completos
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* o modal para o sindico agendar uma nova reunião  igual a que tem no dashboard */}
          {showNewMeetingModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Agendar Nova Reunião</h3>
                  <button 
                    onClick={() => setShowNewMeetingModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                
                <form onSubmit={handleSubmitMeeting}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Título da Reunião</label>
                    <input
                      type="text"
                      name="title"
                      value={newMeeting.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                      placeholder="Ex: Assembleia Geral Ordinária"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Data</label>
                      <input
                        type="date"
                        name="date"
                        value={newMeeting.date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Horário</label>
                      <input
                        type="time"
                        name="time"
                        value={newMeeting.time}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Local</label>
                    <select
                      name="location"
                      value={newMeeting.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                    >
                      <option value="Salão de Festas">Salão de Festas</option>
                      <option value="Área Gourmet">Área Gourmet</option>
                      <option value="Sala de Reuniões">Sala de Reuniões</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Pauta/Assuntos</label>
                    <textarea
                      name="agenda"
                      value={newMeeting.agenda}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] h-32"
                      placeholder="Liste os assuntos que serão discutidos na reunião"
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowNewMeetingModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666]"
                    >
                      Agendar Reunião
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}