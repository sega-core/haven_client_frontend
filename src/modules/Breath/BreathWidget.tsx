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
    label: "Выхайте пока не завершится круг",
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

  const playTick = useCallback(() => {
    if (!audioCtxRef.current) {
      initAudio();
    }
    const ctx = audioCtxRef.current;
    if (!ctx || ctx.state !== "running") return;

    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    filter.type = "lowpass";
    filter.frequency.value = 2000;
    filter.Q.value = 0.5;

    osc1.type = "sine";
    osc1.frequency.value = 523.25; // C5 - приятный высокий тон

    osc2.type = "sine";
    osc2.frequency.value = 783.99; // G5

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    osc1.start();
    osc2.start();
    osc1.stop(now + 0.4);
    osc2.stop(now + 0.4);
  }, [initAudio]);

  const playPhaseChange = useCallback(() => {
    if (!audioCtxRef.current) {
      initAudio();
    }
    const ctx = audioCtxRef.current;
    if (!ctx || ctx.state !== "running") return;

    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    filter.type = "lowpass";
    filter.frequency.value = 1500;
    filter.Q.value = 1;

    osc1.type = "sine";
    osc1.frequency.value = 261.63; // C4

    osc2.type = "sine";
    osc2.frequency.value = 329.63; // E4

    osc3.type = "sine";
    osc3.frequency.value = 392.0; // G4

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    osc1.start();
    osc2.start();
    osc3.start();
    osc1.stop(now + 0.8);
    osc2.stop(now + 0.8);
    osc3.stop(now + 0.8);
  }, [initAudio]);

  const playCompletionSound = useCallback(() => {
    if (!audioCtxRef.current) {
      initAudio();
    }
    const ctx = audioCtxRef.current;
    if (!ctx || ctx.state !== "running") return;

    const playBowl = (startTime: number, pitch: number) => {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      filter.type = "lowpass";
      filter.frequency.value = 1200;
      filter.Q.value = 2;

      osc1.type = "sine";
      osc1.frequency.value = pitch;

      osc2.type = "sine";
      osc2.frequency.value = pitch * 1.5;

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2);

      osc1.start(startTime);
      osc2.start(startTime);
      osc1.stop(startTime + 2);
      osc2.stop(startTime + 2);
    };

    playBowl(ctx.currentTime, 196.0); // G3
    playBowl(ctx.currentTime + 0.8, 261.63); // C4
    playBowl(ctx.currentTime + 1.6, 329.63); // E4
  }, [initAudio]);

  const enableAudio = useCallback(() => {
    initAudio();
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  }, [initAudio]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      playTick();

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

    return () => clearInterval(interval);
  }, [isActive, phase, playTick, playPhaseChange]);

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
          return 600;
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
