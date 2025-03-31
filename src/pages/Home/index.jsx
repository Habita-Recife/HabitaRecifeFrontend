import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/logo04.png";
import backgroundImage from "../../assets/BackgroundPaginaLogin.png";
import womanImage from "../../assets/Womanimage.png";
import condominioImage from "../../assets/imagemCondo.png";
import { Building2, Users, Shield, Clock, MessageSquare, Phone, Mail, MapPin, Wallet, Bell, ShoppingBag, AlertCircle } from "lucide-react";

// essas sao as animacoes  q eu pesquisei, e to testando
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function Home() {
  const scrollToQuemSomos = (e) => {
    e.preventDefault();
    document.getElementById('quem-somos').scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServicos = (e) => {
    e.preventDefault();
    document.getElementById('nossos-servicos').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-[#1e2a38] shadow-md fixed w-full z-50"
      >
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <motion.img 
              src={logo} 
              alt="Logo Habita Recife" 
              className="w-12 h-12"
              whileHover={{ scale: 1.05 }}
            />
            <span className="text-xl font-bold text-white">Habita Recife</span>
          </Link>
          
          <nav className="flex items-center gap-4 sm:gap-6">
            <motion.a 
              href="#quem-somos" 
              onClick={scrollToQuemSomos} 
              className="text-gray-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Quem Somos
            </motion.a>
            <motion.a 
              href="#nossos-servicos" 
              onClick={scrollToServicos} 
              className="text-gray-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Serviços
            </motion.a>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link 
                to="/login" 
                className="bg-[#008080] text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-[#006666] transition-colors"
              >
                Login
              </Link>
            </motion.div>
          </nav>
        </div>
      </motion.header>

      
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative pt-32 pb-12 sm:pt-40 sm:py-20 text-white"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight"
          >
            Soluções Inteligentes para uma<br className="hidden sm:block" />
            Gestão Condominial Eficiente
          </motion.h1>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-200 max-w-3xl mx-auto"
          >
            Facilitando a administração do seu condomínio
            com organização, transparência e eficiência.
          </motion.p>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link 
              to="/login" 
              className="bg-[#008080] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#006666] transition-colors inline-block"
            >
              Comece Agora
            </Link>
          </motion.div>
        </div>
      </motion.section>

     
      <motion.section 
        id="quem-somos" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-12 sm:py-16 bg-[#1e2a38]"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12">
            <motion.div 
              className="md:w-1/2"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Quem Somos</h2>
              <div className="space-y-3 sm:space-y-4 text-gray-300">
                <p>
                  O Habita Recife é uma plataforma inovadora de gestão
                  condominial, desenvolvida para trazer mais eficiência,
                  transparência e praticidade à administração de
                  condomínios.
                </p>
                <p>
                  Nosso objetivo é simplificar processos, melhorar a
                  comunicação entre síndicos, moradores e administradores,
                  além de oferecer soluções inteligentes para o dia a dia
                  condominial.
                </p>
                <p>
                  Com tecnologia e compromisso, ajudamos a transformar
                  a gestão do seu condomínio em algo mais ágil e seguro.
                </p>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2 relative w-full max-w-md mx-auto"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center rounded-lg"
                style={{
                  backgroundImage: `url(${condominioImage})`,
                  filter: 'blur(0.5px)',
                  opacity: 0.15
                }}
              />
              <div className="relative z-10">
                <motion.img 
                  src={womanImage} 
                  alt="Ilustração" 
                  className="w-full h-auto object-contain"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      
      <motion.section 
        className="py-12 sm:py-16 bg-[#1e2a38]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-bold text-center text-white mb-8 sm:mb-12"
          >
            O que Fazemos
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-[#2C3E50] p-4 sm:p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-all"
              variants={item}
              whileHover={{ y: -5, scale: 1.03 }}
            >
              <Building2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#008080] mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Gestão Condominial</h3>
              <p className="text-sm sm:text-base text-gray-300">Administração completa do seu condomínio com eficiência e transparência.</p>
            </motion.div>
            <motion.div 
              className="bg-[#2C3E50] p-4 sm:p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-all"
              variants={item}
              whileHover={{ y: -5, scale: 1.03 }}
            >
              <Users className="w-10 h-10 sm:w-12 sm:h-12 text-[#008080] mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Comunicação</h3>
              <p className="text-sm sm:text-base text-gray-300">Canal direto entre moradores, síndicos e administração.</p>
            </motion.div>
            <motion.div 
              className="bg-[#2C3E50] p-4 sm:p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-all"
              variants={item}
              whileHover={{ y: -5, scale: 1.03 }}
            >
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-[#008080] mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Segurança</h3>
              <p className="text-sm sm:text-base text-gray-300">Controle de acesso e monitoramento para maior segurança.</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* to botando animacao em tudo, se ficar feio eu tiro */}
      <motion.section 
        id="nossos-servicos" 
        className="py-8 bg-[#1e2a38]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <motion.div 
              className="lg:w-1/3"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 border-b-2 border-[#008080] pb-2 inline-block">
                Nossos Serviços
              </h2>
              <div className="space-y-3 text-gray-200">
                <p className="text-sm leading-relaxed">
                  Nosso site de gestão condominial oferece uma
                  solução completa para síndicos, administradoras
                  e moradores, garantindo mais organização,
                  transparência e praticidade no dia a dia do
                  condomínio.
                </p>
                <p className="text-sm font-medium text-[#008080]">
                  Confira alguns serviços disponíveis:
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="lg:w-2/3"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <motion.div 
                  className="bg-[#2C3E50] p-3 rounded-lg shadow-md hover:shadow-lg transition-all"
                  whileHover={{ y: -5, scale: 1.03 }}
                >
                  <Wallet className="w-8 h-8 text-[#008080] mb-2" />
                  <h3 className="text-base font-semibold text-white mb-1">Administração e Financeiro</h3>
                  <p className="text-gray-300 text-xs">Gestão completa das finanças e administração do condomínio.</p>
                </motion.div>
                
                <motion.div 
                  className="bg-[#2C3E50] p-3 rounded-lg shadow-md hover:shadow-lg transition-all"
                  whileHover={{ y: -5, scale: 1.03 }}
                >
                  <MessageSquare className="w-8 h-8 text-[#008080] mb-2" />
                  <h3 className="text-base font-semibold text-white mb-1">Comunicação e Atendimento</h3>
                  <p className="text-gray-300 text-xs">Canais eficientes de comunicação entre moradores e administração.</p>
                </motion.div>
                
                <motion.div 
                  className="bg-[#2C3E50] p-3 rounded-lg shadow-md hover:shadow-lg transition-all"
                  whileHover={{ y: -5, scale: 1.03 }}
                >
                  <Shield className="w-8 h-8 text-[#008080] mb-2" />
                  <h3 className="text-base font-semibold text-white mb-1">Segurança e Controle de Acesso</h3>
                  <p className="text-gray-300 text-xs">Sistema integrado de controle de acesso e segurança.</p>
                </motion.div>
                
                <motion.div 
                  className="bg-[#2C3E50] p-3 rounded-lg shadow-md hover:shadow-lg transition-all"
                  whileHover={{ y: -5, scale: 1.03 }}
                >
                  <ShoppingBag className="w-8 h-8 text-[#008080] mb-2" />
                  <h3 className="text-base font-semibold text-white mb-1">Marketplace e Benefícios</h3>
                  <p className="text-gray-300 text-xs">Plataforma de benefícios e serviços exclusivos para moradores.</p>
                </motion.div>
                
                <motion.div 
                  className="bg-[#2C3E50] p-3 rounded-lg shadow-md hover:shadow-lg transition-all"
                  whileHover={{ y: -5, scale: 1.03 }}
                >
                  <AlertCircle className="w-8 h-8 text-[#008080] mb-2" />
                  <h3 className="text-base font-semibold text-white mb-1">Gestão de Ocorrências</h3>
                  <p className="text-gray-300 text-xs">Sistema eficiente para registro e acompanhamento de chamados.</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* testando varias animacoes com o farm motion kkkk */}
      <motion.footer 
        className="bg-black text-white py-8 sm:py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={item}>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <motion.img 
                  src={logo} 
                  alt="Logo Habita Recife" 
                  className="w-10 h-10 sm:w-12 sm:h-12"
                  whileHover={{ scale: 1.05 }}
                />
                <span className="text-lg sm:text-xl font-bold">Habita Recife</span>
              </Link>
              <p className="text-sm sm:text-base text-gray-300">Sua plataforma completa de gestão condominial.</p>
            </motion.div>
            <motion.div variants={item}>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contato</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone size={18} className="sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">(81) 9999-9999</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={18} className="sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">contato@habitarecife.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Recife, PE</span>
                </div>
              </div>
            </motion.div>
            <motion.div variants={item}>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <motion.a 
                    href="#quem-somos" 
                    onClick={scrollToQuemSomos} 
                    className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    Quem Somos
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="#nossos-servicos" 
                    onClick={scrollToServicos} 
                    className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    Serviços
                  </motion.a>
                </li>
                <li>
                  <motion.div whileHover={{ x: 5 }}>
                    <Link to="/login" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">
                      Login
                    </Link>
                  </motion.div>
                </li>
              </ul>
            </motion.div>
            <motion.div variants={item}>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Horário de Atendimento</h3>
              <div className="flex items-center gap-2">
                <Clock size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Segunda a Sexta: 8h às 18h</span>
              </div>
            </motion.div>
          </motion.div>
          <motion.div 
            className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm sm:text-base text-gray-300"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>&copy; 2024 Habita Recife. Todos os direitos reservados.</p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}