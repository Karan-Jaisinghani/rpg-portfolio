import React from 'react';
import { useScrollReveal, playSectionRevealSound } from '../hooks/useGameAudio';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms delay for staggered reveals
  direction?: 'up' | 'left' | 'right' | 'fade';
  playSound?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  playSound = false,
}) => {
  const { ref, isVisible } = useScrollReveal();

  // Play reveal sound when element becomes visible
  React.useEffect(() => {
    if (isVisible && playSound) {
      setTimeout(() => playSectionRevealSound(), delay);
    }
  }, [isVisible, playSound, delay]);


  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${className}`}
      style={{
        transitionDuration: '600ms',
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translate(0, 0)'
          : direction === 'up'
          ? 'translateY(40px)'
          : direction === 'left'
          ? 'translateX(-40px)'
          : direction === 'right'
          ? 'translateX(40px)'
          : 'none',
      }}
    >
      {children}
    </div>
  );
};
