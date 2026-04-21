// Backdrop.tsx
import React, { useEffect } from 'react';

export interface BackdropProps {
  activeColor: string;
  trackIndex: number;
  isPlaying: boolean;
}

export const Backdrop: React.FC<BackdropProps> = ({ 
  activeColor, 
  trackIndex, 
  isPlaying 
}) => {
  useEffect(() => {
    document.documentElement.style.setProperty('--active-color', activeColor);
  }, [trackIndex, activeColor]);

  return (
    <div 
      className={`fixed inset-0 -z-10 bg-gradient-to-br from-[var(--active-color)] via-[var(--active-color)] to-transparent transition-all duration-300 ${
        isPlaying ? 'animate-gradient' : ''
      }`} 
    />
  );
};