import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../containers/Routes";

const tabs = [
  {
    id: "House" as const,
    name: "Главная",
    route: ROUTES.MAIN,
  },
  {
    id: "Goal" as const,
    name: "Цели",
    route: ROUTES.TARGETS,
  },
  {
    id: "MessageCircle" as const,
    name: "Комьюнити",
    route: ROUTES.COMUNITY,
  },
  {
    id: "LibreryBig" as const,
    name: "Практики",
    route: ROUTES.PRACTICS,
  },
];

export const TabBarNew3 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Определяем активный индекс на основе текущего пути
  const activeTabIndex =
    tabs.findIndex((tab) => tab.route === location.pathname) ?? 0; // Если не найдено, по умолчанию 0

  const handleTabClick = (route: string) => {
    navigate(route); // Навигация через React Router
  };

  // Рассчитываем проценты для underline (предполагаем 4 равных таба, 25% каждый)
  const tabCount = tabs.length;
  const underlineWidthPercent = 100 / tabCount; // 25%
  const underlineLeftPercent = activeTabIndex * underlineWidthPercent; // 0%, 25%, 50%, 75%

  return (
    <div className="relative mx-auto flex h-16 w-full max-w-md rounded-full bg-gray-800 px-2 shadow-lg">
      {/* Анимированная подчеркивающая линия */}
      <span
        className="absolute bottom-0 left-0 top-0 z-20 flex overflow-hidden rounded-full transition-all duration-300 ease-in-out"
        style={{
          left: `${underlineLeftPercent}%`,
          width: `${underlineWidthPercent}%`,
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
            onClick={() => handleTabClick(tab.route)}
            className={`relative flex flex-1 flex-col items-center justify-center py-3 text-sm font-medium transition-all duration-300 ease-in-out ${
              isActive ? "text-white" : "text-gray-300 hover:text-white"
            }`}
          >
            <span className="text-xl">
              {tab.id === "House"
                ? "🏠"
                : tab.id === "Goal"
                ? "🎯"
                : tab.id === "MessageCircle"
                ? "💬"
                : "📚"}
            </span>
            <span className="mt-1">{tab.name}</span>
          </button>
        );
      })}
    </div>
  );
};
