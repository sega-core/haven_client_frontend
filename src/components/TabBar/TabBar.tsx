import { useState } from "react";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

const TabBarItem = ({
  name,
  title,
  isActive,
  onClick,
}: {
  name: "House" | "Goal" | "MessageCircle" | "LibreryBig";
  title: string;
  isActive?: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-center transition duration-700 ease-in-out
      flex-1 py-[6px] gap-[6px] rounded-full cursor-pointer ${
        isActive && "bg-[var(--color-beige-tertiary)]"
      }`}
    >
      <Icon
        name={name}
        width={20}
        height={20}
        fill="var(--color-brown-primary)"
      />
      <Typography type="body-xs" weight="medium">
        {title}
      </Typography>
    </div>
  );
};

export const TabBar = () => {
  const [isActive, setIsActive] = useState(0);
  return (
    <div className="flex fixed left-[14px] right-[14px] bottom-4 ">
      <div className="border-solid border-violet-700 p-2 bg-[var(--color-white-tertiary)] z-50 w-full border rounded-full flex">
        <TabBarItem
          name={"House"}
          title="Главная"
          isActive={isActive === 0}
          onClick={() => setIsActive(0)}
        />
        <TabBarItem
          name={"Goal"}
          title="Цели"
          isActive={isActive === 1}
          onClick={() => setIsActive(1)}
        />
        <TabBarItem
          name={"MessageCircle"}
          title="Комьюнити"
          isActive={isActive === 2}
          onClick={() => setIsActive(2)}
        />
        <TabBarItem
          name={"LibreryBig"}
          title="Практики"
          isActive={isActive === 3}
          onClick={() => setIsActive(3)}
        />
      </div>
    </div>
  );
};
