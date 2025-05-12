import React from 'react';
import { EnhancedProjectsSection } from '../animations/ScrollAnimations';

// Import data
const projects = [
  {
    title: "Futuristic Dashboard",
    description: "A cutting-edge admin dashboard with real-time data visualization and AI-powered insights. Built with React, D3.js, and WebGL for smooth animations.",
    tags: ["React", "D3.js", "WebGL", "AI/ML"]
  },
  {
    title: "3D Portfolio Website",
    description: "An immersive 3D portfolio featuring interactive models, physics simulations, and adaptive lighting. Created with Three.js and React Three Fiber.",
    tags: ["Three.js", "React", "GLSL", "WebXR"]
  },
  {
    title: "Quantum Computing Visualizer",
    description: "Interactive quantum circuit builder with real-time simulation and visualization. Helps users understand quantum computing concepts through visual learning.",
    tags: ["Quantum Computing", "WebAssembly", "Visualization", "Education"]
  }
];

const Projects = () => {
  return <EnhancedProjectsSection projects={projects} />;
};

export default Projects;