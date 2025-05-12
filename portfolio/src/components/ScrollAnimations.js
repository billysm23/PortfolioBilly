import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'framer-motion';
import React, { useRef, useState } from 'react';

// Custom hook untuk scroll animations
const useScrollAnimation = (offset = ["start end", "end start"]) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset
  });
  
  const isInView = useInView(ref, { 
    threshold: 0.1,
    margin: "-100px 0px -100px 0px"
  });
  
  // Define animation values
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  
  return {
    ref,
    isInView,
    style: {
      opacity,
      scale,
      y
    }
  };
};

// Animated Section Component
const AnimatedSection = ({ 
  children, 
  className = "", 
  animationType = "fadeZoom", // "fadeZoom", "slideUp", "scaleRotate"
  threshold = 0.1 
}) => {
  const animation = useScrollAnimation();
  const ref = animation.ref;
  const isInView = animation.isInView;
  
  // Different animation variants
  const animationVariants = {
    fadeZoom: {
      initial: { opacity: 0, scale: 0.8 },
      animate: isInView 
        ? { opacity: 1, scale: 1 }
        : { opacity: 0, scale: 0.8 },
      exit: { opacity: 0, scale: 0.8 },
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.4, 0.5, 1],
        scale: { duration: 0.6 }
      }
    },
    slideUp: {
      initial: { opacity: 0, y: 60 },
      animate: isInView 
        ? { opacity: 1, y: 0 }
        : { opacity: 0, y: 60 },
      exit: { opacity: 0, y: 60 },
      transition: { 
        duration: 0.7,
        ease: "easeOut"
      }
    },
    scaleRotate: {
      initial: { opacity: 0, scale: 0.5, rotate: -10 },
      animate: isInView 
        ? { opacity: 1, scale: 1, rotate: 0 }
        : { opacity: 0, scale: 0.5, rotate: -10 },
      exit: { opacity: 0, scale: 0.5, rotate: 10 },
      transition: { 
        duration: 0.9,
        ease: "easeInOut"
      }
    }
  };
  
  const selectedAnimation = animationVariants[animationType];
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={selectedAnimation.initial}
      animate={selectedAnimation.animate}
      exit={selectedAnimation.exit}
      transition={selectedAnimation.transition}
    >
      {children}
    </motion.div>
  );
};

// Staggered Children Animation
const StaggeredContainer = ({ children, staggerDelay = 0.1 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.1 });
  
  return (
    <div ref={ref}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ 
            duration: 0.6,
            delay: index * staggerDelay,
            ease: "easeOut"
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

// Enhanced About Section dengan Scroll Animations
const EnhancedAboutSection = () => {
  const [activeTab, setActiveTab] = useState('skills');
  
  const tabs = [
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' }
  ];
  
  const skills = [
    { name: 'React', level: 90 },
    { name: 'Three.js', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'UI/UX Design', level: 85 },
    { name: 'TypeScript', level: 75 },
  ];
  
  return (
    <AnimatedSection 
      id="about" 
      className="py-20 px-4 md:px-8 bg-dark"
      animationType="fadeZoom"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-5xl font-bold mb-16 text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut"
          }}
        >
          About <span className="text-accent">Me</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column with Staggered Animation */}
          <AnimatedSection animationType="slideUp">
            <h3 className="text-2xl font-bold mb-6 text-white">Who am I?</h3>
            <StaggeredContainer staggerDelay={0.2}>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I'm a passionate full-stack developer and UI designer with a focus on creating futuristic and 
                immersive web experiences. With over 5 years of experience in the industry,
                I specialize in building cutting-edge web applications that blend functionality with striking visuals.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                My approach combines technical expertise with a keen eye for design, allowing me to create
                websites that not only perform flawlessly but also captivate users with their aesthetic appeal.
              </p>
              
              <div className="mt-8 flex space-x-4">
                {['GitHub', 'LinkedIn', 'Twitter'].map((platform) => (
                  <motion.a
                    key={platform}
                    href="#"
                    className="px-4 py-2 border border-accent text-accent rounded-full text-sm hover:bg-accent hover:text-dark transition-colors cursor-hover"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {platform}
                  </motion.a>
                ))}
              </div>
            </StaggeredContainer>
          </AnimatedSection>
          
          {/* Right Column */}
          <AnimatedSection 
            animationType="scaleRotate"
            className="bg-black bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-accent border-opacity-20"
          >
            <div className="flex border-b border-gray-800 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id ? 'text-accent border-b-2 border-accent' : 'text-gray-400'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="min-h-[300px]">
              <AnimatePresence mode="wait">
                {activeTab === 'skills' && (
                  <motion.div 
                    key="skills"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <StaggeredContainer staggerDelay={0.1}>
                      {skills.map((skill, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="text-white">{skill.name}</span>
                            <span className="text-accent">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2">
                            <motion.div
                              className="bg-gradient-to-r from-secondary to-accent h-2 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                        </div>
                      ))}
                    </StaggeredContainer>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </AnimatedSection>
  );
};

// Enhanced Projects Section
const EnhancedProjectsSection = ({ projects = [] }) => {
  return (
    <AnimatedSection 
      className="py-20 px-4 md:px-8 bg-gradient-to-b from-dark to-black"
      animationType="fadeZoom"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-5xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Featured <span className="text-accent">Projects</span>
        </motion.h2>
        
        <StaggeredContainer staggerDelay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div 
                key={i}
                className="group relative overflow-hidden rounded-lg bg-black bg-opacity-50 backdrop-blur-sm border border-accent border-opacity-20 cursor-hover"
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(0, 255, 170, 0)",
                    "0 0 20px rgba(0, 255, 170, 0.3)",
                    "0 0 0 rgba(0, 255, 170, 0)"
                  ]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.div 
                  className="h-64 bg-gradient-to-br from-secondary to-accent opacity-20 group-hover:opacity-30 transition-opacity"
                  whileHover={{ 
                    backgroundPosition: "100% 100%",
                    transition: { duration: 0.5 }
                  }}
                ></motion.div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-300 mb-4">{project.description}</p>
                  <div className="flex space-x-2">
                    {project.tags?.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-black bg-opacity-50 rounded text-xs text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggeredContainer>
      </div>
    </AnimatedSection>
  );
};

export { AnimatedSection, EnhancedAboutSection, EnhancedProjectsSection, StaggeredContainer, useScrollAnimation };
