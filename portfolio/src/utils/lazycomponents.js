import { lazy } from 'react';

// Lazy load heavy components
export const LazyThreeScene = lazy(() => 
  import('../components/features/3D/ThreeDScene')
);

export const LazyEnhancedProjectsSection = lazy(() => 
  import('../components/animations/ScrollAnimations').then(module => ({
    default: module.EnhancedProjectsSection
  }))
);

export const LazyAbout = lazy(() => 
  import('../components/sections/About').then(module => ({
    default: module.About
  }))
);

export const LazySimpleCursor = lazy(() => 
  import('../components/features/Cursor/SimpleCursor')
);

export const LazyConnect = lazy(() => 
  import('../components/sections/Connect').then(module => ({
    default: module.Connect
  }))
);