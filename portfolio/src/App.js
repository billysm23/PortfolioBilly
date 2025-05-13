import { AnimatePresence, motion } from 'framer-motion';
import React, { Suspense, useEffect, useState } from 'react';
import './App.css';
import Footer from './components/layout/Footer';
import LazyWrapper from './components/ui/LazyWrapper';
import { ContactLoading } from './components/ui/LoadingFallback';
import './parallax.css';

// Lazy imports
const NameHeaderLanding = React.lazy(() => import('./components/pages/NameHeaderLanding'));
const Connect = React.lazy(() => import('./components/sections/Connect'));

function App() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [userName] = useState("BILLY SAMUEL");

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Load custom fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@100;200;400;700&display=swap';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Prevent overscroll on mobile
  useEffect(() => {
    const preventOverscroll = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventOverscroll, { passive: false });
    
    return () => {
      document.removeEventListener('touchmove', preventOverscroll);
    };
  }, []);

  return (
    <div className="App parallax-container">
      <AnimatePresence>
        {loading ? (
          // Enhanced Loader
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex flex-col items-center justify-center bg-dark z-50"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-16 h-16 border-4 border-secondary border-t-accent rounded-full"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-8 text-center"
            >
              <motion.h1 
                className="text-3xl font-bold text-white mb-2 font-mono"
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
                <span className="text-accent">{userName.replace(' ', '')}</span>
              </motion.h1>
              
              <motion.div
                className="font-mono text-accent"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Loading Portfolio...
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '200px' }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="mt-6 h-1 bg-gradient-to-r from-secondary to-accent rounded-full"
            />
          </motion.div>
        ) : (
          // Main Content with Lazy Loading
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="content-wrapper"
          >
            {/* Lazy Load Main Portfolio Section */}
            <Suspense fallback={<div className="h-screen bg-dark flex items-center justify-center"><span className="text-accent"></span></div>}>
              <NameHeaderLanding userName={userName} />
            </Suspense>
            
            {/* Lazy Load Connect Section */}
            <LazyWrapper 
              fallback={<ContactLoading />}
              threshold={0.1}
              rootMargin="200px"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, threshold: 0.1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Connect />
              </motion.div>
            </LazyWrapper>
            
            {/* Footer with fade in animation */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, threshold: 0.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Footer />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;