import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const NameTransition = ({ userName = "NAMA ANDA" }) => {
  const { scrollY } = useScroll();
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile and update responsive settings
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 500);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get target position once header is rendered
  useEffect(() => {
    const getResponsiveX = () => {
      const width = window.innerWidth;
      
      if (width < 640) return width * 0.5;
      if (width < 768) return width * 0.18;
      if (width < 1024) return width * 0.15;
      return width * 0.1;
    };

    setTargetPosition({
      x: getResponsiveX(),
      y: 32 + 25,
    });
    
    const handleResize = () => {
      setTargetPosition({
        x: getResponsiveX(),
        y: 32 + 25,
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Calculate transform values for smooth transition
  const progress = useTransform(scrollY, [0, 300], [0, 1]);
  
  // Position transforms - centering the name properly
  const nameX = useTransform(progress, [0, 1], [0, targetPosition.x - window.innerWidth / 2]);
  const nameY = useTransform(progress, [0, 1], [0, targetPosition.y - window.innerHeight / 2]);
  
  // Scale and size transforms
  const nameScale = useTransform(progress, [0, 1], [1, isMobile ? 0.25 : 0.3]);
  const nameFontSize = useTransform(progress, [0, 1], [1, isMobile ? 0.2 : 0.25]);
  
  // Color transition
  const nameColor = useTransform(
    progress,
    [0.7, 1],
    ["rgb(255, 255, 255)", "rgb(0, 255, 170)"]
  );
  
  // Z-index transition - naik saat mendekati header
  const zIndex = useTransform(progress, [0.8, 1], [35, 41]);
  
  // Format name
  const nameParts = userName.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts[1] || '';
  
  // Responsive font size calculation
  const getResponsiveFontSize = () => {
    if (isMobile) {
      return "clamp(2.5rem, 12vw, 4rem)";
    }
    return "clamp(4rem, 8vw, 6rem)";
  };
    
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center pointer-events-none mb-12"
      style={{ 
        scale: nameScale,
        x: nameX,
        y: nameY,
        zIndex: zIndex,
      }}
    >
      <motion.h1 
        className="font-bold text-center font-mono whitespace-nowrap"
        style={{ 
          fontSize: useTransform(nameFontSize, [1, isMobile ? 0.2 : 0.25], [getResponsiveFontSize(), "5rem"]),
          color: nameColor
        }}
      >
        <motion.span 
          animate={{ 
            textShadow: [
              "0 0 10px #00ffaa",
              "0 0 30px #00ffaa, 0 0 50px #7000ff",
              "0 0 10px #00ffaa"
            ]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-accent">{firstName}</span>
          <motion.span className="text-secondary">.</motion.span>
          <span className="text-white">{lastName}</span>
        </motion.span>
      </motion.h1>
    </motion.div>
  );
};

export default NameTransition;