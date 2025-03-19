
import { useEffect, useRef } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px' } = options;
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Add visible class when element is in viewport
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold, rootMargin }
    );

    // Target all elements with animation classes
    const animatedElements = document.querySelectorAll(
      '.fade-in-on-scroll, .scale-in-on-scroll, .slide-in-from-left, .slide-in-from-right'
    );

    // Observe each element
    animatedElements.forEach((element) => {
      if (observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin]);

  return null;
}

export default useScrollAnimation;
