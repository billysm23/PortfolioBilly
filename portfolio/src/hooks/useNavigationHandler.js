import { useCallback } from 'react';

export const useNavigationHandler = () => {
  const navigateToSection = useCallback(async (sectionId) => {
    let section = document.getElementById(sectionId);
    
    if (!section) {
      // Force load the section by triggering a state change
      const event = new CustomEvent('forceLoadSection', { 
        detail: { sectionId } 
      });
      window.dispatchEvent(event);
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Try to find the section again
      section = document.getElementById(sectionId);
    }
    
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return { navigateToSection };
};