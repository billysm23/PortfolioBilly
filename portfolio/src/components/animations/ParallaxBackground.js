import { motion, useScroll, useTransform } from 'framer-motion';
import React from 'react';

const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  
  return (
    <motion.div 
      className="absolute inset-0 -z-10 overflow-hidden"
      style={{ y, opacity }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent/5" />
      <div className="absolute inset-0 bg-black/40" />
    </motion.div>
  );
};

export default ParallaxBackground;