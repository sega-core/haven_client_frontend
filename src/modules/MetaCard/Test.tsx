import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

const cards = [
  { id: 1, text: "Путь" },
  { id: 2, text: "Выбор" },
  { id: 3, text: "Сила" },
  { id: 4, text: "Тень" },
  { id: 5, text: "Рост" },
];

const getRandomPos = () => ({
  x: Math.random() * 220 - 110,
  y: Math.random() * 160 - 80,
  rotate: Math.random() * 60 - 30,
});

export default function MetaphoricalCards() {
  const [phase, setPhase] = useState("idle"); // idle | shuffling | revealed
  const [deck, setDeck] = useState(cards);
  const [positions, setPositions] = useState(
    cards.map((_, i) => ({ x: 0, y: i * 3, rotate: (i - 2) * 2 }))
  );
  const [selected, setSelected] = useState(null);
  const [flipped, setFlipped] = useState(false);

  const timeoutRef = useRef(null);

  const resetStack = (baseDeck) => {
    setPositions(
      baseDeck.map((_, i) => ({
        x: 0,
        y: i * 3,
        rotate: (i - 2) * 2,
      }))
    );
  };

  const drawCard = () => {
    if (phase !== "idle") return;

    setPhase("shuffling");
    setSelected(null);
    setFlipped(false);

    // 1. scatter
    setPositions(deck.map(() => getRandomPos()));

    // 2. shuffle + regroup
    timeoutRef.current = setTimeout(() => {
      const shuffled = [...cards].sort(() => Math.random() - 0.5);
      setDeck(shuffled);

      // regroup stack
      setPositions(
        shuffled.map((_, i) => ({
          x: 0,
          y: i * 3,
          rotate: (i - 2) * 2,
        }))
      );

      // 3. reveal card
      setTimeout(() => {
        const random = shuffled[Math.floor(Math.random() * shuffled.length)];
        setSelected(random);
        setPhase("revealed");

        setTimeout(() => setFlipped(true), 400);
      }, 700);
    }, 700);
  };

  const reset = () => {
    setPhase("idle");
    setDeck(cards);
    setSelected(null);
    setFlipped(false);
    resetStack(cards);
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center gap-6">
      <div className="relative w-[320px] h-[480px] flex items-center justify-center perspective-[1200px]">
        {/* Deck */}
        <AnimatePresence>
          {phase !== "revealed" && (
            <motion.div
              className="absolute w-full h-full"
              animate={
                phase === "shuffling"
                  ? {
                      rotate: [0, -4, 4, -3, 3, 0],
                      x: [0, -10, 10, -6, 6, 0],
                    }
                  : { rotate: 0, x: 0 }
              }
              transition={{ duration: 1.2 }}
            >
              {deck.map((card, i) => (
                <motion.div
                  key={card.id}
                  className="absolute w-full h-full rounded-2xl shadow-xl flex items-center justify-center text-white font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #1f2937, #111827)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backfaceVisibility: "hidden",
                  }}
                  animate={{
                    x: positions[i]?.x || 0,
                    y: positions[i]?.y || 0,
                    rotate: positions[i]?.rotate || 0,
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 16 }}
                >
                  <div className="text-sm opacity-70">✦ Tarot Deck ✦</div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Revealed card */}
        <AnimatePresence>
          {phase === "revealed" && selected && (
            <motion.div
              key={selected.id}
              className="absolute w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
              initial={{ rotateY: 180, scale: 0.6, opacity: 0 }}
              animate={{ rotateY: flipped ? 0 : 180, scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* back */}
              <div
                className="absolute w-full h-full rounded-2xl shadow-2xl flex items-center justify-center text-white"
                style={{
                  backfaceVisibility: "hidden",
                  background: "linear-gradient(135deg, #0f172a, #1f2937)",
                }}
              >
                ✦ Tarot ✦
              </div>

              {/* front */}
              <div
                className="absolute w-full h-full rounded-2xl bg-white shadow-2xl flex flex-col items-center justify-center text-center p-6"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="text-3xl font-bold mb-3">{selected.text}</div>
                <div className="text-sm text-gray-500">Интуитивное послание раскрыто</div>

                <button
                  onClick={reset}
                  className="mt-6 px-4 py-2 rounded-xl bg-black text-white"
                >
                  Снова
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {phase === "idle" && (
        <button
          onClick={drawCard}
          className="px-6 py-3 rounded-2xl bg-white text-black font-medium hover:scale-105 transition"
        >
          Перемешать и вытянуть карту
        </button>
      )}
    </div>
  );
}
