import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState('');
  const [isClicking, setIsClicking] = useState(false);
  const [trailPositions, setTrailPositions] = useState([]);
  
  const cursorRef = useRef(null);
  
  // Helper function to safely check element type
  const checkElementType = (element) => {
    if (!element || typeof element.matches !== 'function') {
      // Fallback untuk browser yang tidak support matches
      if (!element || !element.tagName) return '';
      
      const tagName = element.tagName.toLowerCase();
      const className = element.className || '';
      
      if (['button', 'a'].includes(tagName) || className.includes('btn')) {
        return 'button';
      } else if (['input', 'textarea'].includes(tagName)) {
        return 'input';
      } else if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
        return 'heading';
      }
      return '';
    }
    
    // Menggunakan matches() jika tersedia
    if (element.matches('button, a, .btn')) {
      return 'button';
    } else if (element.matches('input, textarea')) {
      return 'input';
    } else if (element.matches('h1, h2, h3, h4, h5, h6')) {
      return 'heading';
    }
    return '';
  };
  
  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Update trail positions
      setTrailPositions(prev => [
        { x: e.clientX, y: e.clientY, id: Date.now() },
        ...prev.slice(0, 4)
      ]);
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Handle hover states dengan delegation
    const handleGlobalMouseOver = (e) => {
      const elementType = checkElementType(e.target);
      if (elementType) {
        setIsHovering(true);
        setHoverType(elementType);
      } else {
        setIsHovering(false);
        setHoverType('');
      }
    };
    
    document.addEventListener('mouseover', handleGlobalMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleGlobalMouseOver);
    };
  }, []);
  
  const getScaleAndColor = () => {
    if (isClicking) return { scale: 0.8, color: '#ff0066' };
    
    switch (hoverType) {
      case 'button':
        return { scale: 1.5, color: '#7000ff' };
      case 'input':
        return { scale: 1.2, color: '#00ffaa' };
      case 'heading':
        return { scale: 1.3, color: '#ffaa00' };
      default:
        return { scale: isHovering ? 1.2 : 1, color: '#00ffaa' };
    }
  };
  
  const { scale, color } = getScaleAndColor();
  
  return (
    <>
      {/* Main Cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-50 mix-blend-screen"
        style={{
          x: position.x - 10,
          y: position.y - 10,
        }}
        animate={{
          scale,
          backgroundColor: color,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        <div className="w-5 h-5 rounded-full border-2 border-current" />
      </motion.div>
      
      {/* Cursor Trail */}
      <AnimatePresence>
        {trailPositions.map((trail, index) => (
          <motion.div
            key={trail.id}
            className="fixed pointer-events-none z-40"
            style={{
              x: trail.x - 3,
              y: trail.y - 3,
            }}
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 0, opacity: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.05,
            }}
          >
            <div 
              className="w-1.5 h-1.5 rounded-full bg-accent opacity-60"
              style={{ backgroundColor: color }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Secondary Cursor Ring */}
      <motion.div
        className="fixed pointer-events-none z-45"
        style={{
          x: position.x - 15,
          y: position.y - 15,
        }}
        animate={{
          scale: isHovering ? 0.5 : 1,
          opacity: isHovering ? 0.3 : 0.1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
      >
        <div className="w-8 h-8 rounded-full border border-accent" />
      </motion.div>
      
      {/* Text Indicator */}
      <AnimatePresence>
        {hoverType === 'button' && (
          <motion.div
            className="fixed pointer-events-none z-50 font-mono text-xs text-white"
            style={{
              x: position.x + 20,
              y: position.y - 20,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          >
            Click
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;