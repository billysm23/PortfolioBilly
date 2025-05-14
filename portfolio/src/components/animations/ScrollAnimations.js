import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

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
  animationType = "fadeZoom",
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

// Enhanced Projects Section
const EnhancedProjectsSection = ({ projects = [] }) => {
  return (
    <AnimatedSection 
      id="projects"
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
                key={project.id}
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
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image || "/api/placeholder/400/256"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Default Gradient Overlay (always visible) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  
                  {/* Hover Overlay with Buttons */}
                  <div className="group-hover:opacity-100 opacity-0 absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center space-x-8 transition-opacity duration-200">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white bg-opacity-90 backdrop-blur-sm rounded-full flex items-center justify-center text-dark hover:bg-accent hover:text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg 
                          className="w-6 h-6" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </motion.a>
                    )}
                    
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white bg-opacity-90 backdrop-blur-sm rounded-full flex items-center justify-center text-dark hover:bg-accent hover:text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg 
                          className="w-6 h-6" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags?.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-accent bg-opacity-20 text-accent rounded text-xs font-medium"
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

export { AnimatedSection, EnhancedProjectsSection, StaggeredContainer, useScrollAnimation };
