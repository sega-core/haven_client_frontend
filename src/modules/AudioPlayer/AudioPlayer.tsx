// AudioPlayer.tsx
import React, { useState, useEffect, useRef } from 'react';
import { STATIC_TRACKS } from './tracks';
import { AudioControls } from './AudioControls';
import { Backdrop } from './Backdrop';



export const AudioPlayer: React.FC<AudioPlayerProps> = () => {
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const { title, artist, src } = STATIC_TRACKS[trackIndex];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isReady = useRef<boolean>(false);

  const duration = audioRef.current?.duration || 0;

  console.log(audioRef?.current?.currentTime)
  
  const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%';

  const startTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (audioRef.current) {
        if (audioRef.current.ended) {
          toNextTrack();
        } else {
          setTrackProgress(audioRef.current.currentTime);
        }
      }
    }, 1000);
  };

  const onScrub = (value: string) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (audioRef.current) {
      audioRef.current.currentTime = parseFloat(value);
      setTrackProgress(audioRef.current.currentTime);
    }
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(STATIC_TRACKS.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {
    if (trackIndex < STATIC_TRACKS.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
        startTimer();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    audioRef.current = new Audio(src);
    setTrackProgress(0);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [trackIndex]);

  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="max-w-[350px] p-6 rounded-3xl shadow-2xl mx-auto text-white relative">
      <div className="text-center relative z-10">
{/*         <img
          className="w-52 h-52 rounded-full block mx-auto shadow-lg"
          src={image}
          alt={`track artwork for ${title} by ${artist}`}
        /> */}
        
        <h2 className="font-bold mb-1 mt-4 text-xl">{title}</h2>
        <h3 className="font-light mt-0 text-sm opacity-90">{artist}</h3>
        
        <AudioControls
          isPlaying={isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={setIsPlaying}
        />
        
        <div className="mt-2">
          <input
            type="range"
            value={trackProgress}
            step="1"
            min="0"
            max={duration || 100}
            className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-[#3b7677]"
            onChange={(e) => onScrub(e.target.value)}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
            style={{
              background: `linear-gradient(90deg, #fff ${currentPercentage}, #777 ${currentPercentage})`
            }}
          />
          <div className="flex justify-between text-xs mt-1 opacity-80">
            <span>{formatTime(trackProgress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
      
      <Backdrop
        trackIndex={trackIndex}
        activeColor={'red'}
        isPlaying={isPlaying}
      />
    </div>
  );
};