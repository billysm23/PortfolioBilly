import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import ThemeToggler from '../ui/ThemeToggler';
import HamburgerMenu from './HamburgerMenu';

const Header = ({ userName }) => {
  const { scrollY } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navigationLoading, setNavigationLoading] = useState(null);
  const [sectionsReady, setSectionsReady] = useState({
    home: true,
    projects: false,
    about: false,
    connect: false
  });
  
  // Header background opacity
  const headerBg = useTransform(scrollY, [50, 150], [0.4, 0.9]);
  const headerBlur = useTransform(scrollY, [50, 150], [5, 15]);
  
  const menuItems = [
    { name: 'Home', id: 'home' },
    { name: 'Projects', id: 'projects' }, 
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'connect' }
  ];

  // Check if sections exist in DOM periodically
  useEffect(() => {
    const checkSections = () => {
      setSectionsReady(prev => ({
        ...prev,
        projects: !!document.getElementById('projects'),
        about: !!document.getElementById('about'),
        connect: !!document.getElementById('connect')
      }));
    };

    checkSections();

    const interval = setInterval(checkSections, 1000);

    return () => clearInterval(interval);
  }, []);

  // Smart navigation handler
  const handleNavigation = (e, sectionId) => {
    e.preventDefault();
    
    let section = document.getElementById(sectionId);
    
    if (section) {
      // Section exists, scroll to it
      section.scrollIntoView({ behavior: 'smooth' });
      setNavigationLoading(null);
    } else {
      // Section doesn't exist, show loading and try to trigger lazy loading
      setNavigationLoading(sectionId);
      
      const approximatePositions = {
        'home': 0,
        'projects': window.innerHeight * 1.2,
        'about': window.innerHeight * 2.5,
        'connect': window.innerHeight * 4
      };
      
      const targetPosition = approximatePositions[sectionId] || 0;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        const retrySection = document.getElementById(sectionId);
        if (retrySection) {
          retrySection.scrollIntoView({ behavior: 'smooth' });
        }
        setNavigationLoading(null);
      }, 500);
    }
  };
  
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
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, i) => (
              <motion.div
                key={item.name}
                className="relative"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <motion.a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavigation(e, item.id)}
                  className="text-base hover:text-accent transition-colors cursor-hover relative"
                  whileHover={{ 
                    scale: 1.1,
                    textShadow: "0 0 8px #00ffaa"
                  }}
                >
                  {item.name}
                  
                  {/* Loading indicator */}
                  {navigationLoading === item.id && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    />
                  )}
                </motion.a>
              </motion.div>
            ))}
            <ThemeToggler className="ml-4" />
          </div>
          
          {/* Mobile Section */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggler />
            <HamburgerMenu 
              isOpen={isMenuOpen} 
              setIsOpen={setIsMenuOpen}
              onNavigate={handleNavigation}
              sectionsReady={sectionsReady}
              navigationLoading={navigationLoading}
            />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Header;