import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const SimpleCursor = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trailPositions, setTrailPositions] = useState([]);
  
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Restore default cursor on mobile
      if (mobile) {
        document.body.style.cursor = 'auto';
      } else {
        document.body.style.cursor = 'none';
      }
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
      document.body.style.cursor = 'auto'; // Reset on unmount
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {  
      // Hide default cursor
      document.body.style.cursor = 'none';
      
      const updatePosition = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
        
        // Update trail
        setTrailPositions(prev => [
          { x: e.clientX, y: e.clientY, id: Date.now() },
          ...prev.slice(0, 5)
        ]);
      };
      
      const handleMouseDown = () => setIsClicking(true);
      const handleMouseUp = () => setIsClicking(false);
      
      // Simple hover detection using querySelectorAll
      const handleMouseMove = (e) => {
        updatePosition(e);
        
        // Check if cursor is over interactive elements
        const interactiveElements = document.querySelectorAll('button, a, input, textarea, .cursor-hover');
        let isOverInteractive = false;
        
        for (let element of interactiveElements) {
          const rect = element.getBoundingClientRect();
          if (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
          ) {
            isOverInteractive = true;
            break;
          }
        }
        
        setIsActive(isOverInteractive);
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.body.style.cursor = 'auto';
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isMobile]);
  
  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          x: position.x - 12,
          y: position.y - 12,
        }}
        animate={{
          scale: isClicking ? 0.7 : (isActive ? 1.4 : 1),
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        <div className="w-6 h-6 rounded-full bg-accent border-2 border-white mix-blend-difference" />
      </motion.div>
      
      {/* Cursor Glow */}
      <motion.div
        className="fixed pointer-events-none z-40"
        style={{
          x: position.x - 20,
          y: position.y - 20,
        }}
        animate={{
          scale: isActive ? 1.5 : 1,
          opacity: isActive ? 0.6 : 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        <div className="w-10 h-10 rounded-full bg-accent blur-lg" />
      </motion.div>
      
      {/* Trail Particles */}
      <AnimatePresence>
        {trailPositions.map((trail, index) => (
          <motion.div
            key={trail.id}
            className="fixed pointer-events-none z-30"
            style={{
              x: trail.x - 4,
              y: trail.y - 4,
            }}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 0, opacity: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: "easeOut",
            }}
          >
            <div className="w-2 h-2 rounded-full bg-accent opacity-70" />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Click Ripple Effect */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            className="fixed pointer-events-none z-40"
            style={{
              x: position.x - 30,
              y: position.y - 30,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            <div className="w-15 h-15 rounded-full border-2 border-accent" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SimpleCursor;