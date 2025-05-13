import React from 'react';
import { projects } from '../../data/projects';
import { EnhancedProjectsSection } from '../animations/ScrollAnimations';

const Projects = () => {
  return <EnhancedProjectsSection projects={projects} />;
};

export default Projects;