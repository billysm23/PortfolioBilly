import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import FloatingElements from '../animations/FloatingElements';
import ParallaxBackground from '../animations/ParallaxBackground';
import ThreeDScene from '../features/3D/ThreeDScene';

const Hero = ({ userName, isLoaded }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Extract mouse tracking logic
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const mouseMoveX = mousePosition.x * 20;
  const mouseMoveY = mousePosition.y * 20;

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <ParallaxBackground />
      <FloatingElements />
      <ThreeDScene />
      
      <motion.div 
        className="z-10 text-center px-4 relative mt-20"
        style={{ x: mouseMoveX, y: mouseMoveY }}
      >
        <AnimatePresence>
          {isLoaded && (
            <>
              <div className="h-32 mb-4" />
              <motion.div 
                className="text-xl md:text-2xl font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="border-r-2 border-accent pr-2 mr-2">Full Stack Developer</span>
                <span className="border-r-2 border-accent pr-2 mr-2">Mobile Developer</span>
                <span className="border-r-2 border-accent pr-2 mr-2">UI/UX Designer</span>
                <span>Data Analyst</span>
              </motion.div>
              <motion.button 
                className="mt-8 px-8 py-3 bg-secondary hover:bg-opacity-80 text-white rounded-full font-mono text-sm uppercase tracking-wider animate-glow cursor-hover"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Projects
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="text-accent text-sm">Scroll Down</div>
        <div className="h-12 w-0.5 bg-accent mx-auto mt-2"></div>
      </motion.div>
    </section>
  );
};

export default Hero;