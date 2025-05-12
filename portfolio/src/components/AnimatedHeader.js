import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const AnimatedHeader = ({ userName = "NAMA ANDA" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform values for header transformation
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const headerY = useTransform(scrollY, [0, 100], [-100, 0]);
  const nameOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  const nameScale = useTransform(scrollY, [0, 150], [1, 0]);
  
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
  }, []);
  
  return (
    <>
      {/* Fixed Header - Appears on Scroll */}
      <motion.nav 
        className="fixed w-full top-0 z-50 bg-black bg-opacity-80 backdrop-blur-md border-b border-accent border-opacity-20"
        style={{ 
          opacity: headerOpacity,
          y: headerY
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Animated Logo that appears from name */}
            <motion.div 
              className="font-mono text-xl text-accent relative"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8,
                delay: 1,
                type: "spring",
                stiffness: 120
              }}
            >
              <motion.span
                animate={{ 
                  textShadow: [
                    "0 0 10px #00ffaa",
                    "0 0 20px #00ffaa, 0 0 30px #7000ff",
                    "0 0 10px #00ffaa"
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {userName.split(' ').map((word, i) => (
                  <span key={i}>
                    {word}
                    {i < userName.split(' ').length - 1 && <span className="text-secondary">.</span>}
                  </span>
                ))}
              </motion.span>
            </motion.div>
            
            <div className="flex space-x-8">
              {['Home', 'Projects', 'About', 'Contact'].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm hover:text-accent transition-colors cursor-hover"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 + 1.2 }}
                  whileHover={{ 
                    scale: 1.1,
                    textShadow: "0 0 8px #00ffaa"
                  }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>
      
      {/* Main Animated Name in Hero Section */}
      <motion.div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
        style={{ 
          opacity: nameOpacity,
          scale: nameScale
        }}
      >
        <AnimatePresence>
          {isLoaded && (
            <motion.h1 
              className="text-6xl md:text-8xl font-bold text-white text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                className="text-accent"
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
                {userName.split(' ')[0]}
              </motion.span>
              {userName.split(' ').slice(1).map((word, i) => (
                <motion.span key={i} className="block">
                  {word}
                </motion.span>
              ))}
            </motion.h1>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default AnimatedHeader;