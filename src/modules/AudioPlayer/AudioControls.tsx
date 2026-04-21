// AudioControls.tsx
import React from 'react';


export interface AudioControlsProps {
  isPlaying: boolean;
  onPlayPauseClick: (isPlaying: boolean) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
}

// SVG иконки как компоненты
const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const PrevIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
  </svg>
);

const NextIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
  </svg>
);

export const AudioControls: React.FC<AudioControlsProps> = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick
}) => (
  <div className="flex justify-between items-center w-3/4 mx-auto mb-4">
    <button
      type="button"
      className="prev w-9 h-9 transition-transform hover:scale-110"
      aria-label="Previous"
      onClick={onPrevClick}
    >
      <PrevIcon className="w-full h-full fill-white" />
    </button>
    
    {isPlaying ? (
      <button
        type="button"
        className="pause w-10 h-10 transition-transform hover:scale-110"
        onClick={() => onPlayPauseClick(false)}
        aria-label="Pause"
      >
        <PauseIcon className="w-full h-full fill-white" />
      </button>
    ) : (
      <button
        type="button"
        className="play w-10 h-10 transition-transform hover:scale-110"
        onClick={() => onPlayPauseClick(true)}
        aria-label="Play"
      >
        <PlayIcon className="w-full h-full fill-white" />
      </button>
    )}
    
    <button
      type="button"
      className="next w-9 h-9 transition-transform hover:scale-110"
      aria-label="Next"
      onClick={onNextClick}
    >
      <NextIcon className="w-full h-full fill-white" />
    </button>
  </div>
);