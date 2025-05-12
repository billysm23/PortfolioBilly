import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
        ...options
      }
    );

    const currentElement = elementRef.current;
    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [hasIntersected, options]);

  return { elementRef, isIntersecting, hasIntersected };
};

// Hook for lazy loading components
export const useLazyLoad = (threshold = 0.1, rootMargin = '100px') => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shouldLoad) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    const currentElement = elementRef.current;
    observer.observe(currentElement);

    return () => observer.disconnect();
  }, [shouldLoad, threshold, rootMargin]);

  return { elementRef, shouldLoad };
};