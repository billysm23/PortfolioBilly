import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { projects } from '../../data/projects';
import { AnimatedSection } from '../animations/ScrollAnimations';

const ProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextProject = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevProject = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };
  
  const goToProject = (index) => {
    setCurrentIndex(index);
  };

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
        
        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Project Display */}
          <div className="relative h-[600px] md:h-[500px] overflow-hidden rounded-xl bg-black bg-opacity-50 backdrop-blur-sm border border-accent border-opacity-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 p-8 md:p-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                  {/* Project Image */}
                  <div className="relative overflow-hidden rounded-lg group">
                    <img
                      src={projects[currentIndex].image || "/api/placeholder/500/400"}
                      alt={projects[currentIndex].title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                  </div>
                  
                  {/* Project Info */}
                  <div className="flex flex-col justify-center">
                    <motion.h3 
                      className="text-2xl md:text-3xl font-bold text-white mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {projects[currentIndex].title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-300 mb-6 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {projects[currentIndex].description}
                    </motion.p>
                    
                    {/* Tech Stack Tags */}
                    <motion.div 
                      className="flex flex-wrap gap-2 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {projects[currentIndex].tags?.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-accent bg-opacity-20 text-accent rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                    
                    {/* Buttons */}
                    <motion.div 
                      className="flex space-x-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {projects[currentIndex].demo && (
                        <motion.a
                          href={projects[currentIndex].demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 bg-gradient-to-r from-secondary to-accent text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Demo
                        </motion.a>
                      )}
                      
                      {projects[currentIndex].github && (
                        <motion.a
                          href={projects[currentIndex].github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 border border-accent text-accent rounded-lg font-medium hover:bg-accent hover:text-dark transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Code
                        </motion.a>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevProject}
            aria-label="Previous project"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-accent hover:text-dark transition-all border border-accent border-opacity-20"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextProject}
            aria-label="Next project"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-accent hover:text-dark transition-all border border-accent border-opacity-20"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                aria-label={`Go to project ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-accent' 
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          
          {/* Project Counter */}
          <div className="text-center mt-4">
            <span className="text-gray-400 text-sm">
              {currentIndex + 1} of {projects.length}
            </span>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

const Projects = () => {
  return <ProjectCarousel />;
};

export default Projects;