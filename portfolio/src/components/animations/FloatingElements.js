import { motion, useScroll, useTransform } from 'framer-motion';
import React from 'react';

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

const FloatingElements = ({ className = "" }) => {
  const elements = [
    { speed: -0.3, x: 5, y: 20, size: "w-4 h-4", color: "bg-accent", opacity: "opacity-60" },
    { speed: -0.5, x: 90, y: 30, size: "w-6 h-6", color: "bg-secondary", opacity: "opacity-40" },
    { speed: -0.4, x: 15, y: 70, size: "w-3 h-3", color: "bg-accent", opacity: "opacity-70" },
    { speed: -0.6, x: 85, y: 80, size: "w-5 h-5", color: "bg-secondary", opacity: "opacity-50" },
  ];

  return (
    <>
      {elements.map((element, index) => (
        <FloatingElement 
          key={index}
          speed={element.speed} 
          x={element.x} 
          y={element.y} 
          className={`${element.size} rounded-full ${element.color} ${element.opacity} overflow-hidden ${className}`}
        />
      ))}
    </>
  );
};

export { FloatingElement, FloatingElements };
export default FloatingElements;