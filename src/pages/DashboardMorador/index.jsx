import { useState, useEffect } from "react";
import HeaderMorador from "../../components/HeaderMorador";
import SidebarMorador from "../../components/SidebarMorador";
import { Calendar, Clock, Bell, MapPin, Building2, Home, Users, Car, Shield, PartyPopper, Baby, Bike, Leaf, Recycle, Heart, Users2 } from "lucide-react";

export function DashboardMorador() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [currentCard, setCurrentCard] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    const cardTimer = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % 4);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(cardTimer);
    };
  }, []);

  const cards = [
    {
      icon: <Leaf size={32} className="text-green-500" />,
      title: "Mantenha o Ambiente Limpo",
      description: "A limpeza é responsabilidade de todos. Vamos manter nosso condomínio sempre impecável!"
    },
    {
      icon: <Recycle size={32} className="text-blue-500" />,
      title: "Recicle e Faça a Diferença",
      description: "A reciclagem é essencial para o futuro. Separe corretamente seus resíduos."
    },
    {
      icon: <Heart size={32} className="text-red-500" />,
      title: "Convivência e Harmonia",
      description: "Respeito e empatia são fundamentais para uma boa convivência entre vizinhos."
    },
    {
      icon: <Users2 size={32} className="text-purple-500" />,
      title: "Comunidade Unida",
      description: "Juntos somos mais fortes. Participe das atividades do condomínio!"
    }
  ];

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

  return (
    <div className="flex h-screen">
      <SidebarMorador />
      <div className="flex-1 flex flex-col overflow-auto">
        <HeaderMorador />
        <div className="flex-1 p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={20} />
                <span>{formatDate(currentDateTime)}</span>
                <Clock size={20} className="ml-4" />
                <span>{formatTime(currentDateTime)}</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-80">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-[#008080]" />
                Próximos Eventos
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-[#008080] pl-4">
                  <p className="font-medium">Reunião de Condôminos</p>
                  <p className="text-sm text-gray-600">15/03/2024 - 19:00</p>
                </div>
                <div className="border-l-4 border-[#008080] pl-4">
                  <p className="font-medium">Reserva da Área de Lazer</p>
                  <p className="text-sm text-gray-600">20/03/2024 - 14:00</p>
                </div>
                <div className="border-l-4 border-[#008080] pl-4">
                  <p className="font-medium">Assembleia Geral</p>
                  <p className="text-sm text-gray-600">25/03/2024 - 20:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Solicitações Pendentes</h2>
              <p className="text-3xl font-bold text-[#008080]">3</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Próximo Pagamento</h2>
              <p className="text-3xl font-bold text-[#008080]">R$ 500,00</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Serviços Ativos</h2>
              <p className="text-3xl font-bold text-[#008080]">2</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Bell size={20} className="text-[#008080]" />
                Avisos Recentes
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-[#008080] pl-4">
                  <p className="font-medium">Nova regra para reciclagem no condomínio</p>
                  <p className="text-sm text-gray-600">A partir de 01/04/2025, todos os moradores devem separar o lixo reciclável em sacos azuis.</p>
                  <p className="text-xs text-gray-500 mt-1">Publicado em 10/03/2025</p>
                </div>
                <div className="border-l-4 border-[#008080] pl-4">
                  <p className="font-medium">Manutenção do Elevador</p>
                  <p className="text-sm text-gray-600">Manutenção programada para sábado, 16/03/2025, das 8h às 12h.</p>
                  <p className="text-xs text-gray-500 mt-1">Publicado em 08/03/2025</p>
                </div>
                <div className="border-l-4 border-[#008080] pl-4">
                  <p className="font-medium">Novo Horário de Funcionamento da Portaria</p>
                  <p className="text-sm text-gray-600">A partir de 01/04/2025, a portaria funcionará 24h.</p>
                  <p className="text-xs text-gray-500 mt-1">Publicado em 05/03/2025</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-[20px] shadow-lg">
              <h2 className="text-xl font-semibold text-purple-800 mb-4">Informações do Condomínio</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="text-purple-600 mt-1" size={20} />
                  <p className="text-gray-700">Bairro nobre e de fácil acesso na cidade</p>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="text-purple-600 mt-1" size={20} />
                  <p className="text-gray-700">5 blocos residenciais</p>
                </div>
                <div className="flex items-start gap-3">
                  <Home className="text-purple-600 mt-1" size={20} />
                  <p className="text-gray-700">200 unidades</p>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="text-purple-600 mt-1" size={20} />
                  <p className="text-gray-700">500 moradores</p>
                </div>
                <div className="flex items-start gap-3">
                  <Car className="text-purple-600 mt-1" size={20} />
                  <p className="text-gray-700">1 vaga por unidade + visitantes</p>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="text-purple-600 mt-1" size={20} />
                  <p className="text-gray-700">Portaria 24h, câmeras e controle digital</p>
                </div>
                <div className="flex items-start gap-3">
                  <PartyPopper className="text-purple-600 mt-1" size={20} />
                  <p className="text-gray-700">Salão de festas e espaço gourmet</p>
                </div>
                <div className="flex items-start gap-3">
                  <Baby className="text-purple-600 mt-1" size={20} />
                  <p className="text-gray-700">Playground e área verde</p>
                </div>
                <div className="flex items-start gap-3">
                  <Bike className="text-purple-600 mt-1" size={20} />
                  <p className="text-gray-700">Bicicletário e coworking</p>
                </div>
              </div>
            </div>
          </div>

          {/* tentativa de criar um carrossel de cards kkkkkkkk*/}
          <div className="mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center gap-2 mb-4">
                {cards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCard(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentCard === index ? 'bg-[#008080] w-4' : 'bg-gray-300'
                    }`}
                    aria-label={`Ir para card ${index + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setCurrentCard((prev) => (prev - 1 + 4) % 4)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Card anterior"
                >
                  ←
                </button>
                <div className="flex-1 flex items-center justify-center gap-6 p-6 bg-gray-50 rounded-lg">
                  {cards[currentCard].icon}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {cards[currentCard].title}
                    </h3>
                    <p className="text-gray-600">
                      {cards[currentCard].description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentCard((prev) => (prev + 1) % 4)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Próximo card"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

