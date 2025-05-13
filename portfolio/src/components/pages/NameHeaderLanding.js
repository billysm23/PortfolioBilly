import { motion } from 'framer-motion';
import React, { Suspense, useEffect, useState } from 'react';
import NameTransition from '../animations/NameTransition';
import ParallaxBackground from '../animations/ParallaxBackground';
import Header from '../layout/Header';
import Hero from '../sections/Hero';

// Lazy imports for non-critical components
import LazyWrapper from '../ui/LazyWrapper';
import {
  AboutLoading,
  ProjectsLoading
} from '../ui/LoadingFallback';

// Lazy components
const LazySimpleCursor = React.lazy(() => import('../features/Cursor/SimpleCursor'));
const LazyProjects = React.lazy(() => import('../sections/Projects'));
const LazyAbout = React.lazy(() => import('../sections/About'));

const FinalNameHeaderLanding = ({ userName }) => {
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
      {/* Lazy Load Custom Cursor */}
      {showCursor && (
        <Suspense fallback={null}>
          <LazySimpleCursor />
        </Suspense>
      )}
      
      <Header userName={userName} />
      <NameTransition userName={userName} />
      <ParallaxBackground />
      <Hero userName={userName} isLoaded={isLoaded} />

      {/* Lazy Load Projects Section */}
      <LazyWrapper 
        fallback={<ProjectsLoading />}
        threshold={0.1}
        rootMargin="300px"
      >
        <LazyProjects />
      </LazyWrapper>
      
      {/* Lazy Load About Section */}
      <LazyWrapper 
        fallback={<AboutLoading />}
        threshold={0.1}
        rootMargin="300px"
      >
        <LazyAbout />
      </LazyWrapper>
    </motion.div>
  );
};

export default FinalNameHeaderLanding;