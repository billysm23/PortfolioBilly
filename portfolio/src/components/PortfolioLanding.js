import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

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

const PortfolioLanding = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-dark text-white">
      {/* Navigation */}
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
                  className="text-sm hover:text-accent transition-colors"
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
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
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
        
        <div className="z-10 text-center px-4 relative">
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
                  <span className="border-r-2 border-accent pr-2 mr-2">Full Stack Developer</span>
                  <span className="border-r-2 border-accent pr-2 mr-2">Mobile Developer</span>
                  <span className="border-r-2 border-accent pr-2 mr-2">UI/UX Designer</span>
                  <span>Data Analyst</span>
                </motion.div>
                <motion.button 
                  className="mt-8 px-8 py-3 bg-secondary hover:bg-opacity-80 text-white rounded-full font-mono text-sm uppercase tracking-wider animate-glow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  Explore Projects
                </motion.button>
              </>
            )}
          </AnimatePresence>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="text-accent text-sm">Scroll Down</div>
          <div className="h-12 w-0.5 bg-accent mx-auto mt-2"></div>
        </motion.div>
      </section>

      {/* Project Section Preview */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-dark to-black">
        <div className="max-w-7xl mx-auto">
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
                className="group relative overflow-hidden rounded-lg bg-black bg-opacity-50 backdrop-blur-sm border border-accent border-opacity-20"
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

export default PortfolioLanding;