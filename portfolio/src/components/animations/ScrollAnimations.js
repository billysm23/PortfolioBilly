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

export { AnimatedSection, StaggeredContainer, useScrollAnimation };
