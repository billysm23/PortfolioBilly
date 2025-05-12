import { motion, useScroll, useTransform } from 'framer-motion';
import React from 'react';

const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  
  return (
    <motion.div 
      className="absolute inset-0 -z-10"
      style={{ y, opacity }}
    >
      <div className="grid-bg h-full opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-accent/10" />
    </motion.div>
  );
};

const FloatingElement = ({ children, speed = 0.5, x = 0, y = 0, className = '' }) => {
  const { scrollYProgress } = useScroll();
  const translateY = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
  
  return (
    <motion.div 
      className={`absolute ${className}`}
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
        y: translateY 
      }}
      animate={{
        y: [0, -15, 0],
        transition: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export { FloatingElement, ParallaxBackground };
