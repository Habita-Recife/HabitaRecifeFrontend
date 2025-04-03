import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarMorador from "../../components/SidebarMorador";
import HeaderMorador from "../../components/HeaderMorador";
import { Bell, Calendar, FileText, Wallet, Users2, Leaf, Recycle, Heart, Clock, ChevronRight, MapPin, Building2, Home, Users, Car, Shield, PartyPopper, Baby, Bike } from "lucide-react";

const DashboardMorador = () => {
  const navigate = useNavigate();
  const [currentCard, setCurrentCard] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
      setCurrentCard((prev) => (prev + 1) % 4);
    }, 5000);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(timer);
    };
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR');
  };

  const handleNotificationClick = (id) => {
    navigate(`/avisos/${id}`);
  };

  const awarenessCards = [
    {
      icon: <Leaf className="w-8 h-8 text-green-500" />,
      title: "Mantenha o Ambiente Limpo",
      description: "Contribua para um ambiente mais agradável e saudável para todos.",
      gradient: "from-green-50 to-green-100"
    },
    {
      icon: <Recycle className="w-8 h-8 text-blue-500" />,
      title: "Recicle e Faça a Diferença",
      description: "A reciclagem é essencial para um futuro sustentável.",
      gradient: "from-blue-50 to-blue-100"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Convivência e Harmonia",
      description: "Respeito e empatia são fundamentais para uma boa convivência.",
      gradient: "from-red-50 to-red-100"
    },
    {
      icon: <Users2 className="w-8 h-8 text-purple-500" />,
      title: "Comunidade Unida",
      description: "Juntos somos mais fortes e podemos fazer a diferença.",
      gradient: "from-purple-50 to-purple-100"
    }
  ];

  const upcomingEvents = [
    {
      title: "Assembleia de Moradores",
      date: "20/03/2025",
      time: "19:00",
      location: "Salão de Festas",
      type: "meeting"
    },
    {
      title: "Manutenção do Elevador",
      date: "22/03/2025",
      time: "08:00 - 12:00",
      location: "Bloco A",
      type: "maintenance"
    },
    {
      title: "Festa de Confraternização",
      date: "25/03/2025",
      time: "18:00",
      location: "Salão de Festas",
      type: "event"
    }
  ];

  const condominiumInfo = [
    { icon: <MapPin className="w-5 h-5 text-[#008080]" />, text: "Bairro nobre e de fácil acesso na cidade" },
    { icon: <Building2 className="w-5 h-5 text-[#008080]" />, text: "5 blocos residenciais" },
    { icon: <Home className="w-5 h-5 text-[#008080]" />, text: "200 unidades" },
    { icon: <Users className="w-5 h-5 text-[#008080]" />, text: "500 moradores" },
    { icon: <Car className="w-5 h-5 text-[#008080]" />, text: "1 vaga por unidade + visitantes" },
    { icon: <Shield className="w-5 h-5 text-[#008080]" />, text: "Portaria 24h, câmeras e controle digital" },
    { icon: <PartyPopper className="w-5 h-5 text-[#008080]" />, text: "Salão de festas e espaço gourmet" },
    { icon: <Baby className="w-5 h-5 text-[#008080]" />, text: "Playground e área verde" },
    { icon: <Bike className="w-5 h-5 text-[#008080]" />, text: "Bicicletário e coworking" }
  ];

  const notifications = [
    {
      id: 1,
      title: "Assembleia de moradores marcada para dia 20",
      description: "Participe da próxima reunião para discutir melhorias e novidades para o condomínio. Sua presença é essencial!",
      time: "2h atrás"
    },
    {
      id: 2,
      title: "Nova regra para reciclagem no condomínio",
      description: "A partir do próximo mês, os moradores deverão separar os resíduos recicláveis conforme a nova sinalização das lixeiras.",
      time: "5h atrás"
    }
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <SidebarMorador />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderMorador />
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#008080] via-[#006666] to-[#004444] bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                  <span className="text-sm text-white bg-gradient-to-r from-[#008080] to-[#006666] px-4 py-1.5 rounded-full shadow-md">
                    Bem-vindo!
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <Calendar className="w-5 h-5 text-[#008080]" />
                    <span className="font-medium text-gray-700">{formatDate(currentDateTime)}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <Clock className="w-5 h-5 text-[#008080]" />
                    <span className="font-medium text-gray-700">{formatTime(currentDateTime)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#008080]" />
                  Próximos Eventos
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcomingEvents.map((event, index) => (
                    <div 
                      key={index} 
                      className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          event.type === 'meeting' ? 'bg-blue-100' : 
                          event.type === 'maintenance' ? 'bg-yellow-100' : 
                          'bg-green-100'
                        }`}>
                          <Calendar className={`w-5 h-5 ${
                            event.type === 'meeting' ? 'text-blue-600' : 
                            event.type === 'maintenance' ? 'text-yellow-600' : 
                            'text-green-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 group-hover:text-[#008080] transition-colors">{event.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{event.date}</p>
                          <p className="text-sm text-gray-500">{event.time}</p>
                          <p className="text-xs text-gray-400 mt-1">{event.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center gap-4">
                    <div className="bg-blue-100 p-4 rounded-2xl group-hover:bg-blue-200 transition-colors duration-300">
                      <Bell className="w-7 h-7 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Avisos</p>
                      <p className="text-3xl font-bold text-gray-900">3</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center gap-4">
                    <div className="bg-green-100 p-4 rounded-2xl group-hover:bg-green-200 transition-colors duration-300">
                      <Calendar className="w-7 h-7 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Reservas</p>
                      <p className="text-3xl font-bold text-gray-900">2</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center gap-4">
                    <div className="bg-purple-100 p-4 rounded-2xl group-hover:bg-purple-200 transition-colors duration-300">
                      <FileText className="w-7 h-7 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Documentos</p>
                      <p className="text-3xl font-bold text-gray-900">5</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center gap-4">
                    <div className="bg-orange-100 p-4 rounded-2xl group-hover:bg-orange-200 transition-colors duration-300">
                      <Wallet className="w-7 h-7 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Financeiro</p>
                      <p className="text-3xl font-bold text-gray-900">R$ 500</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white">
                  <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentCard * 100}%)` }}>
                    {awarenessCards.map((card, index) => (
                      <div key={index} className="w-full flex-shrink-0 p-8">
                        <div className="flex flex-col items-center text-center">
                          <div className={`bg-gradient-to-br ${card.gradient} p-6 rounded-3xl shadow-lg transform hover:scale-110 transition-all duration-300`}>
                            {card.icon}
                          </div>
                          <h3 className="mt-6 text-2xl font-bold text-gray-900">{card.title}</h3>
                          <p className="mt-3 text-gray-600 max-w-md text-lg">{card.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
                    {awarenessCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentCard(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentCard === index ? "bg-[#008080] w-6" : "bg-gray-300 w-2"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentCard((prev) => (prev - 1 + 4) % 4)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setCurrentCard((prev) => (prev + 1) % 4)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110"
                  >
                    →
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <Bell className="w-6 h-6 text-[#008080]" />
                    Últimos Avisos
                  </h2>
                  <button className="text-sm text-[#008080] hover:text-[#006666] flex items-center gap-2 bg-[#008080]/10 px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#008080]/20">
                    Ver todos <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification.id)}
                      className="p-5 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all duration-300 hover:shadow-lg border border-gray-100 group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#008080] transition-colors">{notification.title}</h3>
                          <p className="text-gray-600 mt-2 text-base">{notification.description}</p>
                        </div>
                        <span className="text-sm text-gray-500 bg-white px-4 py-1.5 rounded-full shadow-md">{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <Building2 className="w-6 h-6 text-[#008080]" />
                    Informações do Condomínio
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {condominiumInfo.map((info, index) => (
                    <div 
                      key={index} 
                      className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-[#008080]/10 group-hover:bg-[#008080]/20 transition-colors duration-300">
                          {info.icon}
                        </div>
                        <p className="text-sm text-gray-700 group-hover:text-[#008080] transition-colors">{info.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMorador;

