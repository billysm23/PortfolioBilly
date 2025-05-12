import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useState } from 'react';
import HamburgerMenu from './HamburgerMenu';

const Header = ({ userName }) => {
  const { scrollY } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Header background opacity
  const headerBg = useTransform(scrollY, [50, 150], [0.4, 0.9]);
  const headerBlur = useTransform(scrollY, [50, 150], [5, 15]);
  
  const menuItems = ['Home', 'Projects', 'About', 'Contact'];
  
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
          {/* Logo Space - Will be occupied by transitioning name */}
          <div className="relative w-48 h-8 flex items-center">
            <div id="header-logo-target" className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-full" />
          </div>
          
          {/* Desktop Menu - Hidden on mobile */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item, i) => (
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

export default Header;