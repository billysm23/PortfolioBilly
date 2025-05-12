import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

const HamburgerMenu = ({ isOpen, setIsOpen }) => {
  const menuItems = ['Home', 'Projects', 'About', 'Contact'];

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
              {menuItems.map((item, i) => (
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

export default HamburgerMenu;