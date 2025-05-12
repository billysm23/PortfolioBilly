import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { EnhancedAboutSection, EnhancedProjectsSection } from './ScrollAnimations';
import SimpleCursor from './SimpleCursor';

const HamburgerMenu = ({ isOpen, setIsOpen }) => {
  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <motion.button
        className="flex flex-col justify-center items-center w-8 h-8 cursor-hover"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span 
          className="w-6 h-0.5 bg-white mb-1 rounded"
          animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span 
          className="w-6 h-0.5 bg-white mb-1 rounded"
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span 
          className="w-6 h-0.5 bg-white rounded"
          animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-16 right-0 w-48 bg-black bg-opacity-95 backdrop-blur-md border border-accent border-opacity-20 rounded-lg"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="py-2">
              {['Home', 'Projects', 'About', 'Contact'].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-4 py-3 text-white hover:text-accent hover:bg-accent hover:bg-opacity-10 transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Komponen 3D Model
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

// Komponen Parallax Background
const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  
  return (
    <motion.div 
      className="absolute inset-0 -z-10 overflow-hidden"
      style={{ y, opacity }}
    >
      <div className="grid-bg h-full opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-accent/10" />
    </motion.div>
  );
};

// Komponen Floating Elements with Parallax
const FloatingElement = ({ children, speed = 0.5, x = 0, y = 0, className = '' }) => {
  const { scrollYProgress } = useScroll();
  const translateY = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
  
  return (
    <motion.div 
      className={`absolute ${className}`}
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
        y: translateY 
      }}
      animate={{
        y: [0, -15, 0],
        transition: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }
      }}
    >
      {children}
    </motion.div>
  );
};

// Komponen Header dengan Logo Placeholder
const HeaderWithLogo = ({ userName }) => {
  const { scrollY } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Header background opacity
  const headerBg = useTransform(scrollY, [50, 150], [0.4, 0.9]);
  const headerBlur = useTransform(scrollY, [50, 150], [5, 15]);
  
  return (
    <motion.nav 
      className="fixed w-full top-0 z-40 border-b border-accent border-opacity-20"
      style={{ 
        background: useTransform(
          headerBg, 
          (value) => `rgba(0,0,0,${value})`
        ),
        backdropFilter: useTransform(
          headerBlur,
          (value) => `blur(${value}px)`
        )
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Space */}
          <div className="relative w-48 h-8 flex items-center">
            {/* Target marker */}
            <div id="header-logo-target" className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-full" />
          </div>
          
          {/* Desktop Menu - Hidden on mobile */}
          <div className="hidden md:flex space-x-8">
            {['Home', 'Projects', 'About', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-base hover:text-accent transition-colors cursor-hover"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                whileHover={{ 
                  scale: 1.1,
                  textShadow: "0 0 8px #00ffaa"
                }}
              >
                {item}
              </motion.a>
            ))}
          </div>
          
          {/* Mobile Hamburger Menu */}
          <HamburgerMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        </div>
      </div>
    </motion.nav>
  );
};

// Komponen Nama yang Bertransition
const NameTransition = ({ userName = "NAMA ANDA" }) => {
  const { scrollY } = useScroll();
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  
  // Get target position once header is rendered
  useEffect(() => {
    const getResponsiveX = () => {
      const width = window.innerWidth;
      
      if (width < 640) return width * 0.5;
      if (width < 768) return width * 0.18;
      if (width < 1024) return width * 0.15;
      return width * 0.1;
    };

    setTargetPosition({
      x: getResponsiveX(),
      y: 32 + 25,
    });
  }, []);
  
  // Calculate transform values for smooth transition
  const progress = useTransform(scrollY, [0, 300], [0, 1]);
  
  // Position transforms - centering the name properly
  const nameX = useTransform(progress, [0, 1], [0, targetPosition.x - window.innerWidth / 2]);
  const nameY = useTransform(progress, [0, 1], [0, targetPosition.y - window.innerHeight / 2]);
  
  // Scale and size transforms
  const nameScale = useTransform(progress, [0, 1], [1, 0.3]);
  const nameFontSize = useTransform(progress, [0, 1], [1, 0.25]);
  
  // Color transition
  const nameColor = useTransform(
    progress,
    [0.7, 1],
    ["rgb(255, 255, 255)", "rgb(0, 255, 170)"]
  );
  
  // Z-index transition - akan naik saat mendekati header
  const zIndex = useTransform(progress, [0.8, 1], [40, 50]);
  
  // Format name
  const nameParts = userName.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts[1] || '';
  
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center pointer-events-none mb-12"
      style={{ 
        scale: nameScale,
        x: nameX,
        y: nameY,
        zIndex: zIndex, // Dynamic z-index
      }}
    >
      <motion.h1 
        className="font-bold text-center font-mono whitespace-nowrap"
        style={{ 
          fontSize: useTransform(nameFontSize, [1, 0.25], ["clamp(4rem, 8vw, 6rem)", "5rem"]),
          color: nameColor
        }}
      >
        <motion.span 
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
          <span className="text-accent">{firstName}</span>
          <motion.span className="text-secondary">.</motion.span>
          <span className="text-white">{lastName}</span>
        </motion.span>
      </motion.h1>
    </motion.div>
  );
};

// Komponen Utama Final Landing
const FinalNameHeaderLanding = ({ userName = "NAMA ANDA" }) => {
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

  // Sample projects data
  const projects = [
    {
      title: "Futuristic Dashboard",
      description: "A cutting-edge admin dashboard with real-time data visualization and AI-powered insights. Built with React, D3.js, and WebGL for smooth animations.",
      tags: ["React", "D3.js", "WebGL", "AI/ML"]
    },
    {
      title: "3D Portfolio Website",
      description: "An immersive 3D portfolio featuring interactive models, physics simulations, and adaptive lighting. Created with Three.js and React Three Fiber.",
      tags: ["Three.js", "React", "GLSL", "WebXR"]
    },
    {
      title: "Quantum Computing Visualizer",
      description: "Interactive quantum circuit builder with real-time simulation and visualization. Helps users understand quantum computing concepts through visual learning.",
      tags: ["Quantum Computing", "WebAssembly", "Visualization", "Education"]
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      // Find elements taller than viewport
      const elements = document.querySelectorAll('*');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.height > window.innerHeight) {
          console.log('Tall element:', el, 'Height:', rect.height);
        }
      });
      
      // Check scroll height
      console.log('Document scroll height:', document.documentElement.scrollHeight);
      console.log('Window height:', window.innerHeight);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-dark text-white relative overflow-hidden">
      {/* Custom Cursor */}
      {showCursor && <SimpleCursor />}
      
      {/* Header dengan Logo Target (z-40) */}
      <HeaderWithLogo userName={userName} />
      
      {/* Nama yang Bertransition (z-40 to z-50) */}
      <NameTransition userName={userName} />
      
      {/* Parallax Background */}
      <ParallaxBackground />

      {/* Hero Section with 3D */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Floating Elements with Parallax */}
        <FloatingElement speed={-0.3} x={5} y={20} className="w-4 h-4 rounded-full bg-accent opacity-60 overflow-hidden" />
        <FloatingElement speed={-0.5} x={90} y={30} className="w-6 h-6 rounded-full bg-secondary opacity-40 overflow-hidden" />
        <FloatingElement speed={-0.4} x={15} y={70} className="w-3 h-3 rounded-full bg-accent opacity-70 overflow-hidden" />
        <FloatingElement speed={-0.6} x={85} y={80} className="w-5 h-5 rounded-full bg-secondary opacity-50 overflow-hidden" />
        
        {/* 3D Scene */}
        <div className="absolute inset-0 z-0 overflow-hidden">
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
        
        {/* Content with Mouse Parallax (excluding name) */}
        <motion.div 
          className="z-10 text-center px-4 relative mt-20"
          style={{ x: mouseMoveX, y: mouseMoveY }}
        >
          <AnimatePresence>
            {isLoaded && (
              <>
                {/* Space for name above */}
                <div className="h-32 mb-4" />
                
                {/* Sub-text dan button */}
                <motion.div 
                  className="text-xl md:text-2xl font-light"
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

      {/* Enhanced Projects Section with Scroll Animations */}
      <EnhancedProjectsSection projects={projects} />
      
      {/* Enhanced About Section with Scroll Animations */}
      <EnhancedAboutSection />
    </div>
  );
};

export default FinalNameHeaderLanding;