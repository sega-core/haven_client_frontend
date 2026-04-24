import { useEffect, useRef, useState } from "react";
import { Block } from "../../components/Block";
import { Track } from "./Track";
import { STATIC_TRACKS } from "./Track.constants";

export const TrackList = () => {
  const [trackIndex, setTrackIndex] = useState<number | null>(null);
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeTrackId, setActiveTrackId] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const duration = audioRef.current?.duration || 0;

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

  const toNextTrack = () => {
    if (trackIndex === null) return;
    if (trackIndex < STATIC_TRACKS.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  // Смена трека
  useEffect(() => {
    if (trackIndex === null) return;

    // Останавливаем текущий трек
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Создаем новый аудио объект
    const { src, id } = STATIC_TRACKS[trackIndex];
    audioRef.current = new Audio(src);
    setTrackProgress(0);
    
    // Устанавливаем активный трек (чтобы показывать прогресс-бар)
    setActiveTrackId(id);
    
    // Если нужно сразу играть - запускаем
    if (isPlaying) {
      audioRef.current.play()
        .then(() => {
          startTimer();
        })
        .catch(err => console.error("Play error:", err));
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

  // Воспроизведение/пауза
  useEffect(() => {
    if (!audioRef.current || trackIndex === null) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            startTimer();
          })
          .catch(err => {
            console.error("Play error:", err);
            setIsPlaying(false);
          });
      }
    } else {
      audioRef.current.pause();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isPlaying]);

  const handlePlayPauseClick = (isPlayingValue: boolean, index: number) => {
    const trackId = STATIC_TRACKS[index].id;
    
    if (trackIndex === index) {
      // Тот же трек - просто пауза/воспроизведение
      setIsPlaying(isPlayingValue);
    } else {
      // Новый трек - меняем индекс и ставим на паузу/воспроизведение
      setTrackIndex(index);
      setIsPlaying(isPlayingValue);
      setActiveTrackId(trackId);
    }
  };

  return (
    <Block disabledTranform>
      {STATIC_TRACKS.map((item, index) => (
        <Track
          {...item}
          key={index}
          onPlayPauseClick={handlePlayPauseClick}
          isPlaying={trackIndex === index && isPlaying}
          isActive={activeTrackId === item.id}
          index={index}
          duration={duration}
          onScrub={onScrub}
          onScrubEnd={onScrubEnd}
          trackProgress={trackProgress}
        />
      ))}
    </Block>
  );
};