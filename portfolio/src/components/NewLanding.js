import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { FloatingElement, ParallaxBackground } from './Background';
import SimpleCursor from './SimpleCursor';

// 3D Model
function Model() {
  const mesh = useRef();
  useFrame(() => {
    mesh.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      <meshStandardMaterial color="#7000ff" metalness={0.9} roughness={0.1} />
    </mesh>
  );
}

const NewLanding = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
      setShowCursor(true);
    }, 500);
  }, []);
  
  // Mouse parallax effect
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const mouseMoveX = mousePosition.x * 20;
  const mouseMoveY = mousePosition.y * 20;

  return (
    <div className="min-h-screen bg-dark text-white relative overflow-hidden">
      {showCursor && <SimpleCursor />}
      <ParallaxBackground />
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-10 bg-black bg-opacity-80 backdrop-blur-md border-b border-accent border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-xl text-accent"
            >
              PORTFOLIO<span className="text-secondary">.</span>
            </motion.div>
            <div className="flex space-x-8">
              {['Home', 'Projects', 'About', 'Contact'].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm hover:text-accent transition-colors cursor-hover"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center">
        {/* Floating Elements with Parallax */}
        <FloatingElement speed={-0.3} x={5} y={20} className="w-4 h-4 rounded-full bg-accent opacity-60" />
        <FloatingElement speed={-0.5} x={90} y={30} className="w-6 h-6 rounded-full bg-secondary opacity-40" />
        <FloatingElement speed={-0.4} x={15} y={70} className="w-3 h-3 rounded-full bg-accent opacity-70" />
        <FloatingElement speed={-0.6} x={85} y={80} className="w-5 h-5 rounded-full bg-secondary opacity-50" />
        
        {/* 3D Scene */}
        <div className="absolute inset-0 z-0">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <Model />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              autoRotate 
              autoRotateSpeed={0.5} 
            />
          </Canvas>
        </div>
        
        {/* Content with Mouse Parallax */}
        <motion.div 
          className="z-10 text-center px-4 relative"
          style={{ x: mouseMoveX, y: mouseMoveY }}
        >
          <AnimatePresence>
            {isLoaded && (
              <>
                <motion.h1 
                  className="text-6xl md:text-8xl font-bold mb-4 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="text-accent">BILLY</span>SAMUEL
                </motion.h1>
                <motion.div 
                  className="text-xl md:text-2xl font-light mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <span className="border-r-2 border-accent pr-2 mr-2">Web Developer</span>
                  <span className="border-r-2 border-accent pr-2 mr-2">UI Designer</span>
                  <span>Creative Thinker</span>
                </motion.div>
                <motion.button 
                  className="mt-8 px-8 py-3 bg-secondary hover:bg-opacity-80 text-white rounded-full font-mono text-sm uppercase tracking-wider animate-glow cursor-hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Projects
                </motion.button>
              </>
            )}
          </AnimatePresence>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="text-accent text-sm">Scroll Down</div>
          <div className="h-12 w-0.5 bg-accent mx-auto mt-2"></div>
        </motion.div>
      </section>

      {/* Project Section Preview + Parallax */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-dark to-black relative">
        <FloatingElement speed={-0.2} x={10} y={10} className="w-24 h-24 rounded-full bg-accent opacity-10 blur-2xl" />
        <FloatingElement speed={-0.3} x={80} y={60} className="w-32 h-32 rounded-full bg-secondary opacity-10 blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Featured <span className="text-accent">Projects</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                className="group relative overflow-hidden rounded-lg bg-black bg-opacity-50 backdrop-blur-sm border border-accent border-opacity-20 cursor-hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-64 bg-gradient-to-br from-secondary to-accent opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white mb-2">Project {i}</h3>
                  <p className="text-sm text-gray-300 mb-4">Lorem dimsum siomay</p>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-black bg-opacity-50 rounded text-xs text-accent">React</span>
                    <span className="px-2 py-1 bg-black bg-opacity-50 rounded text-xs text-accent">Node.js</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewLanding;