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
  /* {
    id: "Goal" as const,
    name: "Карты",
    route: ROUTES.TARGETS,
    gradient: "from-purple-100 to-pink-100",
  }, */
  {
    id: "Goal" as const,
    name: "Дыхание",
    route: ROUTES.BREATH,
    color: "bg-cold-green-secondary",
    emoji: "🧘",
  },
];

export const Card = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4">
      {cards.map((item) => (
        <div
          className="flex flex-col h-full"
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
            className="text-brown-primary text-center"
          >
            {item.name}
          </Typography>
        </div>
      ))}
    </div>
  );
};
