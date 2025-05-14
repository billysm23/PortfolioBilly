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
const Connect = React.lazy(() => import('../sections/Connect'));

const NameHeaderLanding = ({ userName, preloadSections = false, isMobile = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [forceLoadProjects, setForceLoadProjects] = useState(false);
  const [forceLoadAbout, setForceLoadAbout] = useState(false);
  const [forceLoadConnect, setForceLoadConnect] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
      setShowCursor(!isMobile);
    }, 300);
  }, [isMobile]);

  // React to preloadSections prop changes
  useEffect(() => {
    if (preloadSections) {
      setForceLoadProjects(true);
      setForceLoadAbout(true);
      setForceLoadConnect(true);
    }
  }, [preloadSections]);

  // Listen for custom events to force load sections
  useEffect(() => {
    const handleForceLoadSection = (event) => {
      const { sectionId } = event.detail;
      
      if (sectionId === 'projects') {
        setForceLoadProjects(true);
      } else if (sectionId === 'about') {
        setForceLoadAbout(true);
      } else if (sectionId === 'connect') {
        setForceLoadConnect(true);
      }
    };

    window.addEventListener('forceLoadSection', handleForceLoadSection);
    return () => window.removeEventListener('forceLoadSection', handleForceLoadSection);
  }, []);

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
      {forceLoadProjects ? (
        <div id="projects">
          <Suspense fallback={<ProjectsLoading />}>
            <LazyProjects />
          </Suspense>
        </div>
      ) : (
        <LazyWrapper 
          fallback={<ProjectsLoading />}
          threshold={0.1}
          rootMargin="300px"
          id="projects-wrapper"
        >
          <div id="projects">
            <LazyProjects />
          </div>
        </LazyWrapper>
      )}
      
      {/* About Section */}
      {forceLoadAbout ? (
        <div id="about">
          <Suspense fallback={<AboutLoading />}>
            <LazyAbout />
          </Suspense>
        </div>
      ) : (
        <LazyWrapper 
          fallback={<AboutLoading />}
          threshold={0.1}
          rootMargin="300px"
          id="about-wrapper"
        >
          <div id="about">
            <LazyAbout />
          </div>
        </LazyWrapper>
      )}

      {/* Connect Section */}
      {forceLoadConnect ? (
        <div id="connect">
          <Suspense fallback={<div className="py-20 px-4 md:px-8"><span className="text-accent">Loading Contact...</span></div>}>
            <Connect />
          </Suspense>
        </div>
      ) : (
        <LazyWrapper 
          fallback={<div className="py-20 px-4 md:px-8"><span className="text-accent">Loading Contact...</span></div>}
          threshold={0.1}
          rootMargin="300px"
          id="connect-wrapper"
        >
          <div id="connect">
            <Connect />
          </div>
        </LazyWrapper>
      )}
    </motion.div>
  );
};

export default NameHeaderLanding;