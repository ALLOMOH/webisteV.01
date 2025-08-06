import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, Network, Shield, Cloud, Code, Settings, Users, Award, Mail, Phone, MapPin, Menu, X } from 'lucide-react';

const NetworkBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const networkNodes = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f1ca13" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f1ca13" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Network connections */}
        {networkNodes.map((node, i) => (
          networkNodes.slice(i + 1).map((otherNode, j) => {
            const distance = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
            );
            if (distance < 20) {
              return (
                <line
                  key={`${i}-${j}`}
                  x1={node.x}
                  y1={node.y}
                  x2={otherNode.x}
                  y2={otherNode.y}
                  stroke="#f1ca13"
                  strokeWidth="0.1"
                  opacity={0.3 - distance * 0.015}
                  className="animate-pulse"
                />
              );
            }
            return null;
          })
        ))}
        
        {/* Network nodes */}
        {networkNodes.map((node) => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={node.size * 0.2}
            fill="url(#nodeGradient)"
            opacity={node.opacity}
            className="animate-pulse"
          />
        ))}
      </svg>
      
      {/* Interactive glow effect */}
      <div 
        className="absolute w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #f1ca13 0%, transparent 70%)',
          left: `${(mousePosition.x / window.innerWidth) * 100}%`,
          top: `${(mousePosition.y / window.innerHeight) * 100}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.3s ease',
        }}
      />
    </div>
  );
};

const FloatingCard = ({ children, delay = 0 }) => {
  return (
    <div 
      className="transform transition-all duration-700 hover:scale-105 hover:-translate-y-2"
      style={{
        animation: `float 6s ease-in-out infinite ${delay}s`,
      }}
    >
      {children}
      <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

const GlowButton = ({ children, variant = "primary", className = "", ...props }) => {
  const baseClasses = "px-8 py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden group";
  const variants = {
    primary: "bg-gradient-to-r from-[#f1ca13] to-[#ff7f11] text-[#1d3446] hover:shadow-2xl hover:shadow-[#f1ca13]/50",
    secondary: "bg-gradient-to-r from-[#1d3446] to-[#0a84c1] text-white hover:shadow-2xl hover:shadow-[#0a84c1]/50",
    outline: "border-2 border-[#f1ca13] text-[#f1ca13] hover:bg-[#f1ca13] hover:text-[#1d3446] hover:shadow-2xl hover:shadow-[#f1ca13]/50"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </button>
  );
};

const CountUpAnimation = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          let startTime = null;
          const animate = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`count-${end}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [end, duration, isVisible]);

  return <span id={`count-${end}`}>{count}{suffix}</span>;
};

export default function IT4AWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const services = [
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Conseil et stratégie IT",
      description: "Optimisation de votre infrastructure technologique pour une performance maximale.",
      color: "from-[#f1ca13] to-[#ff7f11]"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Réseaux et cybersécurité",
      description: "Protection avancée de vos données et systèmes contre les menaces numériques.",
      color: "from-[#0a84c1] to-[#1d3446]"
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Solutions cloud et hébergement",
      description: "Migration et gestion cloud pour une infrastructure flexible et évolutive.",
      color: "from-[#ff7f11] to-[#f1ca13]"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Développement et intégration",
      description: "Solutions logicielles sur mesure adaptées à vos besoins spécifiques.",
      color: "from-[#1d3446] to-[#0a84c1]"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Support et maintenance IT",
      description: "Assistance technique 24/7 pour garantir la continuité de vos opérations.",
      color: "from-[#0a84c1] to-[#ff7f11]"
    }
  ];

  const sectors = [
    { name: "Santé", image: "👨‍⚕️" },
    { name: "Finance & Banque", image: "💼" },
    { name: "Éducation", image: "🎓" },
    { name: "Télécommunications", image: "📡" },
    { name: "E-commerce", image: "🛒" },
    { name: "Secteur Public", image: "🏛️" },
    { name: "Logistique & Transport", image: "🚚" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1d3446] via-[#0a84c1] to-[#1d3446] text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#1d3446]/95 backdrop-blur-lg border-b border-[#f1ca13]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#f1ca13] to-[#ff7f11] rounded-lg flex items-center justify-center">
                <Network className="w-6 h-6 text-[#1d3446]" />
              </div>
              <span className="text-xl font-bold">IT4A</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['Accueil', 'Services', 'À propos', 'Contact'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:text-[#f1ca13] transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f1ca13] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
            
            <div className="hidden md:block">
              <GlowButton variant="outline" className="text-sm px-6 py-2">
                Nous contacter
              </GlowButton>
            </div>
            
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
        <NetworkBackground />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                IT Experts
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#f1ca13] to-[#ff7f11]">
                  4 Africa
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Boostez votre entreprise avec la technologie. Des solutions IT innovantes pour un avenir numérique prospère en Afrique.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <GlowButton variant="primary" className="group">
                En savoir plus
                <ChevronRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </GlowButton>
              <GlowButton variant="outline">
                Nos services
              </GlowButton>
            </div>
            
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[#f1ca13]/20">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-black text-[#f1ca13]">
                  <CountUpAnimation end={10} suffix="+" />
                </div>
                <p className="text-sm text-gray-400">ans d'expérience</p>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-black text-[#f1ca13]">
                  <CountUpAnimation end={500} suffix="+" />
                </div>
                <p className="text-sm text-gray-400">clients satisfaits</p>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-black text-[#f1ca13]">
                  <CountUpAnimation end={4000} suffix="+" />
                </div>
                <p className="text-sm text-gray-400">projets réalisés</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#f1ca13]/20 to-[#ff7f11]/20 backdrop-blur-sm" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 bg-gradient-to-br from-[#f1ca13] to-[#ff7f11] rounded-full flex items-center justify-center shadow-2xl">
                  <Network className="w-24 h-24 text-[#1d3446]" />
                </div>
              </div>
              
              {/* Floating elements */}
              <FloatingCard delay={0}>
                <div className="absolute top-12 left-12 w-16 h-16 bg-[#0a84c1] rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </FloatingCard>
              
              <FloatingCard delay={1}>
                <div className="absolute top-12 right-12 w-16 h-16 bg-[#ff7f11] rounded-xl flex items-center justify-center shadow-lg">
                  <Cloud className="w-8 h-8 text-white" />
                </div>
              </FloatingCard>
              
              <FloatingCard delay={2}>
                <div className="absolute bottom-12 left-12 w-16 h-16 bg-[#f1ca13] rounded-xl flex items-center justify-center shadow-lg">
                  <Code className="w-8 h-8 text-[#1d3446]" />
                </div>
              </FloatingCard>
              
              <FloatingCard delay={0.5}>
                <div className="absolute bottom-12 right-12 w-16 h-16 bg-[#1d3446] rounded-xl flex items-center justify-center shadow-lg">
                  <Settings className="w-8 h-8 text-[#f1ca13]" />
                </div>
              </FloatingCard>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f1ca13] to-[#ff7f11]">Services</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Des solutions technologiques avancées pour propulser votre entreprise vers l'excellence numérique
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <FloatingCard key={index} delay={index * 0.2}>
                <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-[#f1ca13]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#f1ca13]/20">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {service.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 group-hover:text-[#f1ca13] transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <button className="flex items-center text-[#f1ca13] hover:text-[#ff7f11] transition-colors duration-300 group/btn">
                    Détails
                    <ChevronRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f1ca13]/0 via-[#f1ca13]/5 to-[#ff7f11]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#1d3446]/50 to-[#0a84c1]/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              Secteurs d'<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f1ca13] to-[#ff7f11]">Expertise</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Nous accompagnons les entreprises de tous secteurs avec des technologies de pointe
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {sectors.map((sector, index) => (
              <FloatingCard key={index} delay={index * 0.1}>
                <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-[#f1ca13]/50 transition-all duration-500 hover:shadow-xl hover:shadow-[#f1ca13]/20 text-center">
                  <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">
                    {sector.image}
                  </div>
                  <h3 className="text-sm font-semibold group-hover:text-[#f1ca13] transition-colors duration-300">
                    {sector.name}
                  </h3>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              Prêt à transformer votre 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#f1ca13] to-[#ff7f11]">
                infrastructure IT ?
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contactez nos experts dès aujourd'hui pour une consultation gratuite et découvrez comment nous pouvons optimiser vos systèmes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlowButton variant="primary" className="text-lg">
                Consultation gratuite
              </GlowButton>
              <GlowButton variant="outline" className="text-lg">
                Voir nos projets
              </GlowButton>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1d3446] py-16 px-4 border-t border-[#f1ca13]/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-[#f1ca13] to-[#ff7f11] rounded-lg flex items-center justify-center">
                  <Network className="w-8 h-8 text-[#1d3446]" />
                </div>
                <span className="text-2xl font-bold">IT4A</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Votre partenaire technologique de confiance pour une transformation digitale réussie en Afrique.
              </p>
              <div className="flex space-x-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 bg-gradient-to-r from-[#f1ca13] to-[#ff7f11] rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                    <div className="w-5 h-5 bg-[#1d3446] rounded-full" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6 text-[#f1ca13]">Services</h3>
              <ul className="space-y-3 text-gray-400">
                {['Cybersécurité', 'Gestion IT', 'Solutions Cloud', 'Support technique'].map((item) => (
                  <li key={item} className="hover:text-[#f1ca13] cursor-pointer transition-colors duration-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6 text-[#f1ca13]">Liens utiles</h3>
              <ul className="space-y-3 text-gray-400">
                {['Accueil', 'À propos', 'Blog', 'Contact'].map((item) => (
                  <li key={item} className="hover:text-[#f1ca13] cursor-pointer transition-colors duration-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6 text-[#f1ca13]">Contact</h3>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-[#f1ca13]" />
                  <span>contact@itexperts4africa.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#f1ca13]" />
                  <span>(225) 267-3634</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-[#f1ca13]" />
                  <span>Abidjan, Côte d'Ivoire</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#f1ca13]/20 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 IT Experts 4 Africa. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}