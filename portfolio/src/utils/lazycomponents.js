import { lazy } from 'react';

// Lazy load heavy components
export const LazyThreeScene = lazy(() => 
  import('../components/features/3D/ThreeScene')
);

export const LazyEnhancedProjectsSection = lazy(() => 
  import('../components/animations/ScrollAnimations').then(module => ({
    default: module.EnhancedProjectsSection
  }))
);

export const LazyEnhancedAboutSection = lazy(() => 
  import('../components/animations/ScrollAnimations').then(module => ({
    default: module.EnhancedAboutSection
  }))
);

export const LazySimpleCursor = lazy(() => 
  import('../components/features/Cursor/SimpleCursor')
);

// Contact component lazy loading
export const LazyContact = lazy(() => 
  import('../components/AboutContact').then(module => ({
    default: module.Contact
  }))
);