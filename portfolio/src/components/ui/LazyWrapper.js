import { Suspense } from 'react';
import { useLazyLoad } from '../../hooks/useIntersectionObserver';

const LazyWrapper = ({ 
  children, 
  fallback, 
  threshold = 0.1, 
  rootMargin = '100px',
  className = "",
  id = ""
}) => {
  const { elementRef, shouldLoad } = useLazyLoad(threshold, rootMargin);

  return (
    <div 
      ref={elementRef} 
      className={className}
      id={id}
    >
      {shouldLoad ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
};

export default LazyWrapper;