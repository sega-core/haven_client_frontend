import { Button } from "@heroui/button";
import { useState, useEffect, useCallback, useRef } from "react";
import { Typography } from "../../components/Typography";
import { Icon } from "../../components/Icon";
import { Chip } from "../../components/Chip";

const durations = [
  { label: "1 мин", value: 60 },
  { label: "3 мин", value: 180 },
  { label: "5 мин", value: 300 },
  { label: "10 мин", value: 600 },
];

const phases = [
  {
    name: "inhale",
    duration: 4,
    label: "Вдыхайте пока не завершится круг",
    fillFrom: 0,
    fillTo: 100,
  },
  {
    name: "hold1",
    duration: 4,
    label: "Задержите дыхание",
    fillFrom: 100,
    fillTo: 100,
  },
  {
    name: "exhale",
    duration: 4,
    label: "Выдыхайте пока не завершится круг",
    fillFrom: 100,
    fillTo: 0,
  },
  {
    name: "hold2",
    duration: 4,
    label: "Задержите дыхание",
    fillFrom: 0,
    fillTo: 0,
  },
] as const;

type PhaseName = (typeof phases)[number]["name"];

export const BreathWidget = () => {
  const [practiceDuration, setPracticeDuration] = useState(300);
  const [totalSeconds, setTotalSeconds] = useState(300);
  const [phase, setPhase] = useState<PhaseName>("inhale");
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const isAudioEnabledRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const phaseStartTimeRef = useRef<number>(0);

  const currentPhase = phases.find((p) => p.name === phase)!;

  const circumference = 2 * Math.PI * 45;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;

    audioCtxRef.current = new (
      window.AudioContext ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).webkitAudioContext
    )();
  }, []);

  const playTick = useCallback(() => {
    if (!audioCtxRef.current || !isAudioEnabledRef.current) return;

    const ctx = audioCtxRef.current;
    if (ctx.state !== "running") return;

    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    filter.type = "lowpass";
    filter.frequency.value = 600;
    filter.Q.value = 0.8;

    osc.type = "sine";
    osc.frequency.value = 523.25;

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.008, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    osc.start();
    osc.stop(now + 0.6);
  }, []);

  const playPhaseChange = useCallback(() => {
    if (!audioCtxRef.current || !isAudioEnabledRef.current) return;

    const ctx = audioCtxRef.current;
    if (ctx.state !== "running") return;

    const now = ctx.currentTime;

    const notes = [196.0, 261.63, 329.63, 261.63];

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      filter.type = "lowpass";
      filter.frequency.value = 800;

      osc.type = "sine";
      osc.frequency.value = freq;

      const startTime = now + i * 0.12;

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.012, startTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.8);

      osc.start(startTime);
      osc.stop(startTime + 0.8);
    });
  }, []);

  const playCompletionSound = useCallback(() => {
    if (!audioCtxRef.current || !isAudioEnabledRef.current) return;

    const ctx = audioCtxRef.current;
    if (ctx.state !== "running") return;

    const now = ctx.currentTime;

    const freqs = [110, 164.81, 220, 329.63];

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.value = freq;

      const start = now + i * 0.25;

      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.015, start + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 3);

      osc.start(start);
      osc.stop(start + 3);
    });
  }, []);

  const enableAudio = useCallback(() => {
    initAudio();

    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }

    isAudioEnabledRef.current = true;
  }, [initAudio]);

  useEffect(() => {
    if (!isActive) return;

    phaseStartTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - phaseStartTimeRef.current) / 1000;

      const phaseProgress = Math.min(elapsed / currentPhase.duration, 1);

      const value =
        currentPhase.fillFrom +
        phaseProgress * (currentPhase.fillTo - currentPhase.fillFrom);

      setProgress(value);

      if (elapsed >= currentPhase.duration) {
        playPhaseChange();

        const currentIndex = phases.findIndex((p) => p.name === phase);

        const nextPhase = phases[(currentIndex + 1) % phases.length];

        setPhase(nextPhase.name);

        phaseStartTimeRef.current = now - (elapsed - currentPhase.duration);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, phase, currentPhase, playPhaseChange]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      playTick();
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, playTick]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          setProgress(0);
          playCompletionSound();

          return practiceDuration;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, playCompletionSound, practiceDuration]);

  const start = useCallback(() => {
    enableAudio();

    phaseStartTimeRef.current = performance.now();

    setPhase("inhale");
    setProgress(0);

    setTotalSeconds(practiceDuration);

    setIsActive(true);
  }, [enableAudio, practiceDuration]);

  const reset = useCallback(() => {
    setIsActive(false);
    setPhase("inhale");
    setProgress(0);
    setTotalSeconds(practiceDuration);
    phaseStartTimeRef.current = 0;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, [practiceDuration]);

  return (
    <div className="grid gap-4 text-center">
      <div className="relative mx-auto h-64 w-64">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="4"
            className="stroke-(--stroke-color-2-tertiary)"
          />

          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress / 100)}
            className="stroke-(--plots-progress-2)"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <Icon
            name="Lotus"
            width={100}
            height={100}
            className={isActive ? "animate-pulse" : ""}
          />
        </div>
      </div>

      <Typography type="body-md" className="text-brown-primary">
        {formatTime(totalSeconds)}
      </Typography>

      <Typography type="body-s" className="text-brown-primary">
        {isActive
          ? currentPhase.label
          : "Круг вокруг лотоса будет вашим проводником: ориентируйтесь на него, чтобы синхронизировать вдохи и выдохи."}
      </Typography>

      {!isActive && (
        <div className="flex justify-center gap-2 flex-wrap">
          {durations.map((d) => (
            <Chip
              key={d.value}
              onClick={() => {
                setPracticeDuration(d.value);
                setTotalSeconds(d.value);
              }}
              label={d.label}
              variant={practiceDuration === d.value ? "flat" : "solid"}
            />
          ))}
        </div>
      )}

      {!isActive ? (
        <Button
          onPress={start}
          radius="full"
          className="bg-beige-primary text-white"
        >
          Начать
        </Button>
      ) : (
        <Button
          onPress={reset}
          radius="full"
          className="bg-beige-primary text-white"
        >
          Остановить
        </Button>
      )}
    </div>
  );
};
