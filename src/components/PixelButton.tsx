import React from 'react';
import { playClickSound, playHoverSound } from '../hooks/useGameAudio';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'gray' | 'red';
  children: React.ReactNode;
  noSound?: boolean;
}

export const PixelButton: React.FC<PixelButtonProps> = ({
  variant = 'gold',
  children,
  className = '',
  noSound = false,
  onClick,
  ...props
}) => {
  const variantClass =
    variant === 'gold'
      ? 'pixel-btn-gold'
      : variant === 'red'
      ? 'pixel-btn-red'
      : 'pixel-btn-gray';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!noSound) playClickSound();
    onClick?.(e);
  };

  const handleMouseEnter = () => {
    if (!noSound) playHoverSound();
  };

  return (
    <button
      className={`${variantClass} ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {children}
    </button>
  );
};
