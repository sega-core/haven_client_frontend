import { Icon } from "../Icon";
import { Typography } from "../Typography";
import { useNavigate, useLocation } from "react-router-dom";
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

export const TabBar = () => {
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
    <div className="fixed left-3.5 right-3.5 bottom-4 z-10">
      <div className="p-2 bg-white-tertiary shadow-xl/30 backdrop-blur-md z-50 w-full rounded-full flex relative">
        {/* Скользящая подчеркивающая линия */}
        <span
          className="p-2 absolute bottom-0 left-0 top-0 z-20 flex overflow-hidden rounded-full transition-all duration-300 ease-in-out"
          style={{
            left: `${underlineLeftPercent}%`,
            width: `${underlineWidthPercent}%`,
          }}
        >
          <span className="h-full w-full rounded-full bg-beige-tertiary" />
        </span>
        {tabs.map((tab, index) => {
          const isActive = activeTabIndex === index;

          return (
            <button
              key={index}
              className={`relative flex flex-1 flex-col items-center justify-center py-3 text-sm font-medium transition-all duration-300 ease-in-out ${
                isActive ? "text-white" : "text-gray-300 hover:text-white"
              }`}
              onClick={() => handleTabClick(tab.route)}
            >
              <Icon
                name={tab.id}
                width={20}
                height={20}
                fill="text-brown-primary"
              />
              <Typography
                type="body-xs"
                weight="medium"
                className="text-brown-primary"
              >
                {tab.name}
              </Typography>
            </button>
          );
        })}
      </div>
    </div>
  );
};
