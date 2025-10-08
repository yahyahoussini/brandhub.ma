import { useEffect, useRef } from 'react';

interface LiveRegionProps {
  message: string;
  politeness?: 'polite' | 'assertive';
  clearOnUnmount?: boolean;
}

export const LiveRegion = ({ 
  message, 
  politeness = 'polite', 
  clearOnUnmount = true 
}: LiveRegionProps) => {
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (regionRef.current && message) {
      regionRef.current.textContent = message;
    }
  }, [message]);

  useEffect(() => {
    return () => {
      if (clearOnUnmount && regionRef.current) {
        regionRef.current.textContent = '';
      }
    };
  }, [clearOnUnmount]);

  return (
    <div
      ref={regionRef}
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
      role="status"
    />
  );
};

// Hook for managing live announcements
export const useLiveAnnouncer = () => {
  const announce = (message: string, politeness: 'polite' | 'assertive' = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', politeness);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    // Clean up after announcement
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  };

  return { announce };
};
