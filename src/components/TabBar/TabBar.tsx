import { Icon } from "../Icon";
import { Typography } from "../Typography";

const TabBarItem = ({
  name,
  title,
  isActive,
}: {
  name: "House" | "Goal" | "MessageCircle" | "LibreryBig";
  title: string;
  isActive?: boolean;
}) => {
  return (
    <div className="flex flex-col items-center justify-center flex-1  px-2 gap-2 rounded-full border border-solid shadow-lg">
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
  return (
    <div className="flex fixed left-[14px] right-[14px] bottom-4 ">
      <div className="border-solid border-violet-700 p-2 bg-[var(--color-white-tertiary)] z-50 w-full h-16 border rounded-full flex">
        <TabBarItem name={"House"} title="Главная" />
        <TabBarItem name={"Goal"} title="Цели" />
        <TabBarItem name={"MessageCircle"} title="Комьюнити" />
        <TabBarItem name={"LibreryBig"} title="Практики" />
      </div>
    </div>
  );
};
