import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import NameTransition from '../animations/NameTransition';
import ParallaxBackground from '../animations/ParallaxBackground';
import { EnhancedAboutSection } from '../animations/ScrollAnimations';
import SimpleCursor from '../features/Cursor/SimpleCursor';
import Header from '../layout/Header';
import Hero from '../sections/Hero';
import Projects from '../sections/Projects';

const NameHeaderLanding = ({ userName = "NAMA ANDA" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
      setShowCursor(true);
    }, 500);
  }, []);

  // Debug scroll height
  useEffect(() => {
    setTimeout(() => {
      const elements = document.querySelectorAll('*');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.height > window.innerHeight) {
          console.log('Tall element:', el, 'Height:', rect.height);
        }
      });
      
      console.log('Document scroll height:', document.documentElement.scrollHeight);
      console.log('Window height:', window.innerHeight);
    }, 1000);
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-dark text-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Custom Cursor */}
      {showCursor && <SimpleCursor />}
      
      {/* Header dengan Logo Target (z-40) */}
      <Header userName={userName} />
      
      {/* Nama yang Bertransition (z-40 to z-50) */}
      <NameTransition userName={userName} />
      
      {/* Parallax Background */}
      <ParallaxBackground />

      {/* Hero Section with 3D */}
      <Hero userName={userName} isLoaded={isLoaded} />

      {/* Projects Section */}
      <Projects />
      
      {/* About Section */}
      <EnhancedAboutSection />
    </motion.div>
  );
};

export default NameHeaderLanding;