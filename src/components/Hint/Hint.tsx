import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "../Icon";

interface HintProps {
  text: string;
  example?: string;
  title?: string;
}

export const Hint = ({ text, example, title }: HintProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Icon
        name="Info"
        width={20}
        height={20}
        onClick={() => setIsOpen(true)}
        className="fill-(--stroke-beige-primary)"
      />

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-4 right-4 top-1/2 -translate-y-1/2 z-50 max-w-sm mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-5">
                  {title && (
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {title}
                    </h3>
                  )}
                  <p className="text-gray-600 text-base leading-relaxed mb-3">
                    {text}
                  </p>
                  {example && (
                    <div className="bg-beige-primary/10 rounded-xl p-3 mt-2">
                      <p className="text-xs text-gray-500 mb-1">Пример:</p>
                      <p className="text-sm text-gray-700">"{example}"</p>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 bg-beige-primary text-white font-medium text-base"
                >
                  Понятно
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
