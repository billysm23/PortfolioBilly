import { motion, useScroll, useTransform } from 'framer-motion';
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ParallaxBackground = () => {
  const { isDark } = useTheme();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  
  return (
    <motion.div 
      className="absolute inset-0 -z-10 overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Background gradient based on theme */}
      <div 
        className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-secondary/5 to-accent/5' 
            : 'bg-gradient-to-br from-blue-100 to-blue-200'
        }`} 
      />
      
      {/* Overlay */}
      <div 
        className={`absolute inset-0 ${
          isDark 
            ? 'bg-black/40' 
            : 'bg-white/20'
        }`} 
      />
      
      {/* Additional floating elements for light mode */}
      {!isDark && (
        <>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-300/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-sky-300/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-indigo-300/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        </>
      )}
    </motion.div>
  );
};

export default ParallaxBackground;