import { Button } from "@heroui/button";
import { useState, useEffect, useCallback, useRef } from "react";
import { Typography } from "../../components/Typography";
import { Icon } from "../../components/Icon";

const initialSeconds = 600;

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
];

export const BreathWidget = () => {
  const [phase, setPhase] = useState<"inhale" | "hold1" | "exhale" | "hold2">(
    "inhale",
  );
  const [timeLeft, setTimeLeft] = useState(4);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const isAudioEnabledRef = useRef(false);

  const currentPhase = phases.find((p) => p.name === phase)!;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;
    audioCtxRef.current =
      new // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window.AudioContext || (window as any).webkitAudioContext)();
  }, []);

  // Очень мягкий тик - глубокий колокольчик (низкая частота)
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
    osc.frequency.value = 523.25; // C5 - мягкий, не резкий

    // Очень плавная, тёплая огибающая
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.008, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    osc.start();
    osc.stop(now + 0.6);
  }, []);

  // Мягкий переход между фазами - арпеджио на низких нотах
  const playPhaseChange = useCallback(() => {
    if (!audioCtxRef.current || !isAudioEnabledRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state !== "running") return;

    const now = ctx.currentTime;

    // Медленное, спокойное арпеджио
    const notes = [196.0, 261.63, 329.63, 261.63]; // G3, C4, E4, C4
    
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      filter.type = "lowpass";
      filter.frequency.value = 800;
      filter.Q.value = 1.2;

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

  // Мягкое завершение - звук тибетской чаши (низкий, глубокий)
  const playCompletionSound = useCallback(() => {
    if (!audioCtxRef.current || !isAudioEnabledRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state !== "running") return;

    const now = ctx.currentTime;

    // Основной тон чаши
    const baseFreqs = [110.0, 164.81, 220.0, 329.63];
    const overtones = [2.01, 3.02, 4.03];
    
    baseFreqs.forEach((freq, i) => {
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      const filter1 = ctx.createBiquadFilter();

      osc1.connect(filter1);
      filter1.connect(gain1);
      gain1.connect(ctx.destination);

      filter1.type = "lowpass";
      filter1.frequency.value = 900;
      filter1.Q.value = 2.5;

      osc1.type = "sine";
      osc1.frequency.value = freq;

      // Добавляем обертоны для богатства звука
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(filter1);
      osc2.type = "sine";
      osc2.frequency.value = freq * overtones[i % overtones.length];

      const startTime = now + i * 0.25;
      
      gain1.gain.setValueAtTime(0, startTime);
      gain1.gain.linearRampToValueAtTime(0.015, startTime + 0.15);
      gain1.gain.exponentialRampToValueAtTime(0.0001, startTime + 3.0);

      gain2.gain.setValueAtTime(0, startTime);
      gain2.gain.linearRampToValueAtTime(0.006, startTime + 0.2);
      gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.5);

      osc1.start(startTime);
      osc2.start(startTime);
      osc1.stop(startTime + 3.0);
      osc2.stop(startTime + 3.0);
    });
  }, []);

  const enableAudio = useCallback(() => {
    initAudio();
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
      isAudioEnabledRef.current = true;
    }
  }, [initAudio]);

  useEffect(() => {
    if (!isActive) return;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    let tickInterval: NodeJS.Timeout;
    
    // Используем setTimeout для более точного управления тиками
    const startTicking = () => {
      tickInterval = setInterval(() => {
        playTick();
      }, 1000);
    };
    
    startTicking();

    const phaseInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          playPhaseChange();
          setPhase((prevPhase) => {
            const currentIndex = phases.findIndex((p) => p.name === prevPhase);
            const nextIndex = (currentIndex + 1) % phases.length;
            const nextPhase = phases[nextIndex];
            setTimeLeft(nextPhase.duration);
            return nextPhase.name as typeof phase;
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(phaseInterval);
      clearInterval(tickInterval);
    };
  }, [isActive, playTick, playPhaseChange]);

  useEffect(() => {
    const elapsed = currentPhase.duration - timeLeft;
    const newProgress =
      currentPhase.fillFrom +
      (elapsed / currentPhase.duration) *
        (currentPhase.fillTo - currentPhase.fillFrom);
    setProgress(Math.min(100, Math.max(0, newProgress)));
  }, [timeLeft, phase]);

  useEffect(() => {
    if (!isActive) return;

    const totalInterval = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          playCompletionSound();
          return initialSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(totalInterval);
  }, [isActive, playCompletionSound]);

  const start = useCallback(() => {
    enableAudio();
    setPhase("inhale");
    setTimeLeft(4);
    setProgress(0);
    setIsActive(true);
    setTotalSeconds(initialSeconds);
    isAudioEnabledRef.current = true;
  }, [enableAudio]);

  const reset = useCallback(() => {
    setIsActive(false);
    setPhase("inhale");
    setTimeLeft(4);
    setProgress(0);
    setTotalSeconds(initialSeconds);
  }, []);

  return (
    <div className="grid gap-4 text-center">
      <div className="relative w-64 h-64 mx-auto">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
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
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            strokeLinecap="round"
            className="transition-all duration-200 stroke-(--plots-progress-2)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon name="Lotus" width={100} height={100} />
        </div>
      </div>

      <div className="text-center">
        <Typography type="body-md" className="text-brown-primary">
          {formatTime(totalSeconds)}
        </Typography>
      </div>

      {isActive && (
        <Typography type="body-s" className="text-brown-primary">
          {currentPhase.label}
        </Typography>
      )}
      {!isActive && (
        <Typography type="body-s" className="text-brown-primary">
          Длительность практики — 10 минут. Круг вокруг лотоса будет вашим
          проводником: ориентируйтесь на него, чтобы синхронизировать вдохи и
          выдохи.
        </Typography>
      )}
      <div className="grid">
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
    </div>
  );
};