import { Block } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { Typography } from "../../components/Typography";
import { cn } from "../../utils";
import { useState, useEffect } from "react";

export type TTrack = {
  id: number;
  index: number;
  title: string;
  artist: string;
  src: string;
  coverColor: string;
  isPlaying: boolean;
  isActive: boolean;
  duration: number;
  trackProgress: number;
  onPlayPauseClick: (isPlaying: boolean, index: number) => void;
  onScrub: (value: string) => void;
  onScrubEnd: () => void;
};

export const Track = ({
  title,
  index,
  artist,
  coverColor,
  isPlaying,
  isActive,
  duration,
  trackProgress,
  onPlayPauseClick,
  onScrub,
  onScrubEnd,
}: TTrack) => {
  const [shouldShow, setShouldShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      setShouldShow(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldShow(false), 300);
    }
  }, [isActive]);

  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";

  return (
    <Block disabledTransform className="bg-beige-tertiary! rounded-2xl! gap-0!">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div
            className={cn(
              "w-10 h-10 rounded-md flex items-center justify-center",
              coverColor,
            )}
          >
            <Icon name="Lotus" width={29} height={24} />
          </div>
          <div>
            <Typography type="body-md" className="text-brown-primary">
              {title}
            </Typography>
            <Typography type="body-xs" className="text-brown-secondary">
              {artist}
            </Typography>
          </div>
        </div>
        {isPlaying ? (
          <button
            type="button"
            className="pause w-10 h-10 active:scale-95 transition-transform duration-150"
            onClick={() => onPlayPauseClick(false, index)}
            aria-label="Pause"
          >
            <Icon name="PauseFilled" />
          </button>
        ) : (
          <button
            type="button"
            className="play w-10 h-10 active:scale-95 transition-transform duration-150"
            onClick={() => onPlayPauseClick(true, index)}
            aria-label="Play"
          >
            <Icon name="PlayFilled" />
          </button>
        )}
      </div>

      {(shouldShow || isActive) && (
        <div
          className="mt-3 overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: isVisible ? "100px" : "0",
            opacity: isVisible ? 1 : 0,
            marginTop: isVisible ? "12px" : "0",
          }}
        >
          <input
            type="range"
            value={trackProgress}
            step="1"
            min="0"
            max={duration || 100}
            className="w-full h-1 rounded-lg appearance-none cursor-pointer accent-[#b4895c]"
            onChange={(e) => onScrub(e.target.value)}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
            style={{
              background: `linear-gradient(90deg, #b4895c ${currentPercentage}, #e0d5c0 ${currentPercentage})`,
            }}
          />
          <div className="flex justify-between text-xs mt-1">
            <span className="text-brown-secondary">
              {formatTime(trackProgress)}
            </span>
            <span className="text-brown-secondary">{formatTime(duration)}</span>
          </div>
        </div>
      )}
    </Block>
  );
};
