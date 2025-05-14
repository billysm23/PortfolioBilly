import { AnimatePresence, motion } from 'framer-motion';

const HamburgerMenu = ({ 
  isOpen, 
  setIsOpen, 
  onNavigate, 
  sectionsReady = {}, 
  navigationLoading = null 
}) => {
  const menuItems = [
    { name: 'Home', id: 'home' },
    { name: 'Projects', id: 'projects' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'connect' }
  ];

  const handleMenuClick = (e, id) => {
    setIsOpen(false);
    if (onNavigate) {
      onNavigate(e, id);
    }
  };

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
                <motion.div
                  key={item.name}
                  className="relative"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <motion.a
                    href={`#${item.id}`}
                    className="block px-4 py-3 text-white hover:text-accent hover:bg-accent hover:bg-opacity-10 transition-colors relative"
                    onClick={(e) => handleMenuClick(e, item.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.name}</span>
                      
                      {/* Mobile loading indicator */}
                      {navigationLoading === item.id && (
                        <motion.div
                          className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                    </div>
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburgerMenu;