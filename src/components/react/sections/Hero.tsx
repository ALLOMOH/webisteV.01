import { ChevronRight } from 'lucide-react';
import GlowButton from '../UI/components/GlowButton';
import NetworkBackground from '../UI/Animation/NetworkBackground';
import FloatingCard from '../UI/components/FloatingCard';
import DecryptedText from "../UI/Text/DecryptedText";
import CountUp from "../UI/Text/CountUp";
import ShinyText from "../UI/Text/ShinyText";
import { motion } from 'framer-motion';

const Hero = () => {

  return (
    <motion.section initial={{x:-2, opacity:0 }} transition={{delay:.4}} whileInView={{x:0, opacity:1}} viewport={{once:true}} className=" `box-border relative  w-full h-svh flex items-center justify-center px-4   md:px-4 py-100  md:py-100 backdrop-blur-xs md:backdrop-blur-none ">
      <NetworkBackground 
        animationSpeed={5}
        baseColor={`#f1ca13`}
        connectionDistance={10}
        mouseRepulsion={20}
        className='absolute z-0 sm:-z-10 h-full w-full top-0 left-0' 
      />

      <div className={`px-2 max-w-7xl grid lg:grid-cols-2 gap-12 items-center relative z-10 `}>
        <div className="space-y-2 lg:space-y-8">
          <div className="space-y-2 lg:space-y-2">
            <h1 className="text-2xl font-bold md:text-7xl text-white leading-tight">
              <DecryptedText speed={70}    animateOn='view'  text={`IT Experts`} />
              <span className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f1ca13] to-[#ff7f11]">
                <DecryptedText speed={70}   animateOn='view' text={`4 Africa`} />
              </span>
            </h1>
            <p className="text-xs md:text-xl line-clamp-5 text-gray-300  leading-relaxed">
              <ShinyText textAlign="left" duration={.1}  splitType={'words'} text={`Boostez la performance de votre entreprise grâce à des solutions réseau sur mesure.Nous accompagnons les PME et grandes structures dans l’installation, la gestion et la sécurisation de leurs infrastructures informatiques.
                `}
                 />
            </p>
          </div>

          <div className="flex text-xs md:text-xl flex-col sm:flex-row gap-4">
              <GlowButton href='/about' variant="primary" className="group">
                En savoir plus
                <ChevronRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </GlowButton>

             <FloatingCard delay={15}>
                <GlowButton href='/services' variant="outline">
                  Nos services
                </GlowButton>
             </FloatingCard>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[#f1ca13]/20">
            <div className="text-center">
              <div className="text-3xs md:text-3xl lg:text-4xl font-black text-[#f1ca13]">
                {/* <CountUpAnimation end={10} suffix="+" /> */}
                <CountUp  from={0} to={10} delay={.5} duration={10}/>
              </div>
              <p className="text-xs md:text-sm text-gray-400">ans d'expérience</p>
            </div>
            <div className="text-center">
              <div className="text-3xs md:text-3xl lg:text-4xl font-black text-[#f1ca13]">
                {/* <CountUpAnimation end={100} suffix="+" /> */}
                <CountUp  from={0} to={100} delay={1} duration={10}/>+
              </div>
              <p className="text-xs md:text-sm text-gray-400">clients satisfaits</p>
            </div>
            <div className="text-center">
              <div className="text-3xs md:text-3xl lg:text-4xl font-black text-[#f1ca13]">
                {/* <CountUpAnimation end={400} suffix="+" /> */}
                <CountUp  from={0} to={100} delay={1.5} duration={10}/>+ 
              </div>
              <p className="text-xs md:text-sm text-gray-400">projets réalisés</p>
            </div>
          </div>
        </div>
        {/* 
        <div className="relative  hidden md:flex   ">
          <div className={`relative w-full h-96 lg:h-[500px]  bg-[url(${backgroundHero})] bg-cover bg-no-repeat bg-bottom-right `}></div>
        </div> 
        */}
      </div>
    </motion.section>
  );
};

export default Hero;