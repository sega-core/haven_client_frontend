import { useNavigate } from "react-router";
import { ROUTES } from "../../containers";
import { cn } from "../../utils";
/* import { Icon } from "../Icon"; */
import { Typography } from "../Typography";

const cards = [
  {
    id: "Goal" as const,
    name: "Цели",
    route: ROUTES.TARGETS,
    gradient: "from-rose-100 to-orange-100",
    emoji:'🎯',
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
    gradient: "from-blue-100 to-cyan-100",
    emoji:'🧘',
  },
];

export const Card = () => {
    const navigate = useNavigate();
  
  return (
    <div className="flex gap-4">
      {cards.map((item) => (
        <div className="flex flex-col h-full" onClick={()=>navigate(item.route)}>
          <div
            className={cn(
              "w-15 h-15 rounded-3xl flex items-center justify-center mb-0.5 bg-linear-to-br",
              item.gradient,
              "active:scale-95 transition-transform duration-150"
            )}
          >
           {/*  <Icon
              name={"Goal"}
              width={20}
              height={20}
              fill="text-brown-primary"
              className="fill-(--text-brown-primary)"
            /> */}
            {item.emoji}
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
