import { Tabs, Tab } from "@heroui/tabs";
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
    id: "Calendar" as const,
    name: "Каледарь",
    route: ROUTES.ARCHIVE,
  },
  {
    id: "MessageCircle" as const,
    name: "Комьюнити",
    route: ROUTES.COMUNITY,
  },
  {
    id: "LibreryBig" as const,
    name: "Практики",
    route: ROUTES.PRACTICE,
  },
];

export const TabBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTabIndex = tabs.findIndex(
    (tab) => tab.route === location.pathname,
  );

  const handleTabChange = (index: number) => {
    navigate(tabs[index].route);
  };

  if (activeTabIndex === -1) return null;

  return (
    <div className="fixed left-0 right-0 w-full px-3.5 bottom-4 z-10">
      <div className="max-w-md mx-auto">
        <Tabs
          aria-label="Навигация по приложению"
          color="primary"
          variant="solid"
          radius="full"
          selectedKey={activeTabIndex.toString()}
          onSelectionChange={(key) => handleTabChange(Number(key))}
          classNames={{
            tabList:
              "bg-white-tertiary shadow-xl/30 backdrop-blur-md p-2 w-full",
            tab: "h-auto py-3",
            cursor: "bg-beige-tertiary",
            base: "w-full",
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              title={
                <div className="flex items-center flex-col gap-1">
                  <Icon
                    name={tab.id}
                    width={20}
                    height={20}
                    fill="text-brown-primary"
                    className="fill-(--text-brown-primary)"
                  />
                  <Typography
                    type="body-xs"
                    weight="medium"
                    className="text-brown-primary"
                  >
                    {tab.name}
                  </Typography>
                </div>
              }
            />
          ))}
        </Tabs>
      </div>
    </div>
  );
};
