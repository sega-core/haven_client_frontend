import { Block } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { Typography } from "../../components/Typography";

export type TTrack = {
  id: number;
  title: string;
  artist: string;
  src: string;
  onPlayPauseClick: (isPlaying: boolean, index: number) => void;
  isPlaying: boolean;
  isActive: boolean; // Добавляем isActive
  duration: number;
  index: number;
  trackProgress: number;
  onScrub: (value: string) => void;
  onScrubEnd: () => void;
};

export const Track = ({
  title,
  artist,
  onPlayPauseClick,
  isPlaying,
  isActive, // используем для показа прогресс-бара
  index,
  trackProgress,
  duration,
  onScrub,
  onScrubEnd,
}: TTrack) => {
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
    <Block disabledTranform className="bg-beige-tertiary! rounded-2xl!">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div className="w-10 h-10 bg-cold-green-secondary rounded-md flex items-center justify-center">
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
            className="pause w-10 h-10 transition-transform hover:scale-110"
            onClick={() => onPlayPauseClick(false, index)}
            aria-label="Pause"
          >
            <Icon name="PauseFilled" />
          </button>
        ) : (
          <button
            type="button"
            className="play w-10 h-10 transition-transform hover:scale-110"
            onClick={() => onPlayPauseClick(true, index)}
            aria-label="Play"
          >
            <Icon name="PlayFilled" />
          </button>
        )}
      </div>
      
      {isActive && (
        <div className="mt-3">
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