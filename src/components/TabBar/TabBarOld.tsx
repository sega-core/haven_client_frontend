import { Icon } from "../Icon";
import { Typography } from "../Typography";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../containers/Routes";

const TabBarItem = ({
  name,
  title,
  isActive,
  onClick,
}: {
  name: "House" | "Goal" | "MessageCircle" | "LibreryBig";
  title: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-center transition duration-700 ease-in-out
      flex-1 py-[6px] gap-[6px] rounded-full cursor-pointer ${
        isActive && "bg-[var(--background-beige-tertiary)]"
      }`}
    >
      <Icon
        name={name}
        width={20}
        height={20}
        fill="var(--text-brown-primary)"
      />
      <Typography type="body-xs" weight="medium">
        {title}
      </Typography>
    </div>
  );
};

export const TabBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="flex fixed left-[14px] right-[14px] bottom-4 ">
      <div className="p-2 bg-[var(--background-white-tertiary)] backdrop-blur-md z-50 w-full border rounded-full flex ">
        <TabBarItem
          name={"House"}
          title="Главная"
          isActive={pathname === ROUTES.MAIN}
          onClick={() => navigate(ROUTES.MAIN)}
        />
        <TabBarItem
          name={"Goal"}
          title="Цели"
          isActive={pathname === ROUTES.TARGETS}
          onClick={() => navigate(ROUTES.TARGETS)}
        />
        <TabBarItem
          name={"MessageCircle"}
          title="Комьюнити"
          isActive={pathname === ROUTES.COMUNITY}
          onClick={() => navigate(ROUTES.COMUNITY)}
        />
        <TabBarItem
          name={"LibreryBig"}
          title="Практики"
          isActive={pathname === ROUTES.PRACTICS}
          onClick={() => navigate(ROUTES.PRACTICS)}
        />
      </div>
    </div>
  );
};
