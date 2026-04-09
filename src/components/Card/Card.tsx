import { useNavigate } from "react-router";
import { ROUTES } from "../../containers";
import { cn } from "../../utils";
import { Typography } from "../Typography";

const cards = [
  {
    id: "Goal" as const,
    name: "Цели",
    route: ROUTES.TARGETS,
    color: "bg-vinous-secondary",
    emoji: "🎯",
  },
  {
    id: "Goal" as const,
    name: "Дыхание",
    route: ROUTES.BREATH,
    color: "bg-cold-green-secondary",
    emoji: "🌀",
  },
  {
    id: "Goal" as const,
    name: "Карта",
    route: ROUTES.BREATH,
    color: "bg-brown-secondary",
    emoji: "🪬",
  },
  {
    id: "Goal" as const,
    name: "Дзен",
    route: ROUTES.BREATH,
    color: "bg-mustard-secondary",
    emoji: "🧘",
  },
];

export const Card = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4">
      {cards.map((item, index) => (
        <div
          key={index}
          className="flex flex-col h-full active:scale-95 transition-transform duration-150"
          onClick={() => navigate(item.route)}
        >
          <div
            className={cn(
              "w-15 h-15 rounded-3xl flex items-center justify-center mb-0.5 bg-linear-to-br",
              item.color,
              "active:scale-95 transition-transform duration-150",
            )}
          >
            <div className="text-2xl">{item.emoji}</div>
          </div>
          <Typography
            type={"heading-xs"}
            className="text-brown-primary text-center text-[14px]"
          >
            {item.name}
          </Typography>
        </div>
      ))}
    </div>
  );
};
