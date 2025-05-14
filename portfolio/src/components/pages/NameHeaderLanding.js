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

const NameHeaderLanding = ({ userName, isMobile, sectionsReady }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setShowCursor(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Calculate responsive values
  const getThreshold = () => {
    if (!sectionsReady) return 0.1;
    return isMobile ? 0.2 : 0.3;
  };

  const getRootMargin = () => {
    if (!sectionsReady) return "100px";
    return isMobile ? "300px" : "500px";
  };

  return (
    <motion.div 
      className="min-h-screen bg-dark text-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Custom Cursor - Only on desktop */}
      {showCursor && !isMobile && (
        <Suspense fallback={null}>
          <LazySimpleCursor />
        </Suspense>
      )}
      
      <Header userName={userName} />
      <NameTransition userName={userName} />
      <ParallaxBackground />
      <Hero userName={userName} isLoaded={isLoaded} />

      {/* Projects Section */}
      <LazyWrapper 
        fallback={<ProjectsLoading />}
        threshold={getThreshold()}
        rootMargin={getRootMargin()}
        className="section-wrapper"
        id="projects-wrapper"
      >
        <div id="projects">
          <LazyProjects />
        </div>
      </LazyWrapper>
      
      {/* About Section */}
      <LazyWrapper 
        fallback={<AboutLoading />}
        threshold={getThreshold()}
        rootMargin={getRootMargin()}
        className="section-wrapper"
        id="about-wrapper"
      >
        <div id="about">
          <LazyAbout />
        </div>
      </LazyWrapper>
    </motion.div>
  );
};

export default NameHeaderLanding;