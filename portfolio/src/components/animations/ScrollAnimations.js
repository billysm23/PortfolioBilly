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

export { AnimatedSection, EnhancedProjectsSection, StaggeredContainer, useScrollAnimation };
