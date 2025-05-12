import { motion } from 'framer-motion';
import React from 'react';

// Generic loading skeleton
export const LoadingSkeleton = ({ className = "", height = "h-64" }) => (
  <motion.div 
    className={`bg-black bg-opacity-50 backdrop-blur-sm rounded-xl border border-accent border-opacity-20 ${height} ${className}`}
    animate={{ opacity: [0.3, 0.7, 0.3] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  >
    <div className="flex items-center justify-center h-full">
      <div className="relative">
        <motion.div
          className="w-12 h-12 rounded-full border-4 border-accent border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-2 left-2 w-8 h-8 rounded-full border-3 border-secondary border-b-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  </motion.div>
);

// 3D Scene loading fallback
export const ThreeSceneLoading = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <div className="flex items-center justify-center h-full">
      <motion.div
        className="text-accent text-lg font-mono"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading 3D Scene...
      </motion.div>
    </div>
  </div>
);

// Projects section loading
export const ProjectsLoading = () => (
  <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-dark to-black">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <LoadingSkeleton height="h-12" className="w-80 mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <LoadingSkeleton key={i} />
        ))}
      </div>
    </div>
  </section>
);

// About section loading
export const AboutLoading = () => (
  <section className="py-20 px-4 md:px-8 bg-dark">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <LoadingSkeleton height="h-12" className="w-60 mx-auto" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <LoadingSkeleton height="h-96" />
        <LoadingSkeleton height="h-96" />
      </div>
    </div>
  </section>
);

// Contact loading
export const ContactLoading = () => (
  <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-dark">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <LoadingSkeleton height="h-12" className="w-72 mx-auto" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <LoadingSkeleton height="h-80" />
        <LoadingSkeleton height="h-80" />
      </div>
    </div>
  </section>
);