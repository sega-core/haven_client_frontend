import { useCallback, useState, useMemo } from "react";
import { TargetItem } from "../../modules/Targets";
import { TargetSheet } from "../../modules/Targets";
import { Button } from "@heroui/button";
import { Typography } from "../../components/Typography";
import { useGetTarget } from "../../hooks";
import { SkeletonTarget } from "../../components/Skeleton";
import { Icon } from "../../components/Icon";
import { useDrawerContext } from "../../components/Drawer";
import { Tab, Tabs } from "@heroui/tabs";

export const Targets = () => {
  const { openDrawer, closeDrawer } = useDrawerContext();
  const [activeTab, setActiveTab] = useState<"active" | "archive">("active");

  const handleOpenTargetSheet = useCallback(() => {
    openDrawer({
      title: "Создание цели",
      content: <TargetSheet onClose={closeDrawer} />,
    });
  }, [openDrawer, closeDrawer]);

  const { data, isLoading } = useGetTarget();

  const { activeTargets, archivedTargets } = useMemo(() => {
    const active = data?.filter((item) => item.status === "active") || [];
    const archived = data?.filter((item) => item.status !== "active") || [];
    return { activeTargets: active, archivedTargets: archived };
  }, [data]);

  const currentTargets =
    activeTab === "active" ? activeTargets : archivedTargets;

  const renderActiveTarget = useCallback(() => {
    if (!currentTargets?.length) {
      return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center gap-2">
          <Typography type="body-lg" className="text-brown-primary">
            Нет активных целей
          </Typography>
          <Typography type="body-s" className="text-brown-secondary">
            Начни создавать свои цели
          </Typography>
          <Button
            onPress={handleOpenTargetSheet}
            radius="full"
            className="bg-white-primary text-beige-primary"
          >
            Добавить
          </Button>
        </div>
      );
    }

    if (currentTargets?.length < 2)
      return (
        <div className="flex w-full justify-end">
          <Button
            isIconOnly
            onPress={handleOpenTargetSheet}
            radius="full"
            className="bg-white-primary text-beige-primary"
          >
            <Icon name="Plus" width={20} height={20} />
          </Button>
        </div>
      );

    return null;
  }, [currentTargets]);

  const renderArchiveTarget = useCallback(() => {
    if (!currentTargets?.length) {
      return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center gap-2">
          <Typography type="body-lg" className="text-brown-primary">
            Нет архивных целей
          </Typography>
          <Typography type="body-s" className="text-brown-secondary">
            Тут будут отображаться выполненные и просроченные цели
          </Typography>
        </div>
      );
    }
  }, [currentTargets]);

  return (
    <div className="grid gap-4 w-full">
      <div className="flex justify-center">
        <Tabs
          aria-label="Фильтр целей"
          radius="full"
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as "active" | "archive")}
          classNames={{
            tabList: "bg-white-tertiary p-1",
            tabContent: "group-data-[selected=true]:text-beige-primary px-6",
          }}
        >
          <Tab
            key="active"
            title={
              <div className="flex items-center gap-2">
                <span>Активные</span>
                {activeTargets.length > 0 && (
                  <span className="bg-beige-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeTargets.length}
                  </span>
                )}
              </div>
            }
          />
          <Tab
            key="archive"
            title={
              <div className="flex items-center gap-2">
                <span>Архивные</span>
                {archivedTargets.length > 0 && (
                  <span className="bg-gray-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {archivedTargets.length}
                  </span>
                )}
              </div>
            }
          />
        </Tabs>
      </div>
      <SkeletonTarget isLoading={isLoading}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentTargets.map((item, index) => (
            <TargetItem {...item} key={index} />
          ))}
        </div>
        {activeTab === "active" && renderActiveTarget()}
        {activeTab === "archive" && renderArchiveTarget()}
      </SkeletonTarget>
    </div>
  );
};
