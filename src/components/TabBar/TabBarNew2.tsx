import { useEffect, useRef, useState } from "react";

const tabs = [
  { id: 0, label: "Главная", icon: "🏠" },
  { id: 1, label: "Цели", icon: "🎯" },
  { id: 2, label: "Комьюнити", icon: "💬" },
  { id: 3, label: "Практики", icon: "📚" },
];

export const AnimatedSlidingTabBar = () => {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0); // По умолчанию первый таб активен
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const [underlineLeft, setUnderlineLeft] = useState(0);

  // Обновляем позицию и ширину подчеркивания при смене активного таба
  useEffect(() => {
    const currentTab = tabsRef.current[activeTabIndex];
    if (currentTab) {
      setUnderlineLeft(currentTab.offsetLeft);
      setUnderlineWidth(currentTab.clientWidth);
    }
  }, [activeTabIndex]);

  // Инициализируем позицию при первом рендере
  useEffect(() => {
    const firstTab = tabsRef.current[0];
    if (firstTab) {
      setUnderlineLeft(firstTab.offsetLeft);
      setUnderlineWidth(firstTab.clientWidth);
    }
  }, []);

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
    <div className="relative mx-auto flex h-16 w-full max-w-md rounded-full bg-gray-800 px-2 shadow-lg">
      {/* Анимированная подчеркивающая линия */}
      <span
        className="absolute bottom-0 left-0 top-0 z-20 flex overflow-hidden rounded-full transition-all duration-300 ease-in-out"
        style={{
          left: underlineLeft,
          width: underlineWidth,
        }}
      >
        <span className="h-full w-full rounded-full bg-(--background-beige-tertiary)" />
      </span>

      {/* Табы */}
      {tabs.map((tab, index) => {
        const isActive = activeTabIndex === index;
        return (
          <button
            key={tab.id}
            ref={(el) => (tabsRef.current[index] = el)}
            onClick={() => handleTabClick(index)}
            className={`relative flex flex-1 flex-col items-center justify-center py-3 text-sm font-medium transition-all duration-300 ease-in-out ${
              isActive ? "text-white" : "text-gray-300 hover:text-white"
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="mt-1">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
