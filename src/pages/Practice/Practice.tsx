import { useCallback, useState } from "react";
import { PracticeBundleCard, PracticeCard } from "../../modules/Practice";
import { useGetPractice, useGetPracticeBundle } from "../../hooks";
import { Tabs, Tab } from "@heroui/tabs";
import { Typography } from "../../components/Typography";

export const Practice = () => {
  const [activeTab, setActiveTab] = useState<"my" | "bundle" | "practice">(
    "my",
  );
  const { data: bundles } = useGetPracticeBundle();
  const { data: practices } = useGetPractice();

  const renderBundleList = useCallback(
    () =>
      bundles?.map((item, index) => (
        <PracticeBundleCard item={item} key={index} />
      )),
    [bundles],
  );

  const renderPracticList = useCallback(
    () =>
      practices?.map((item, index) => <PracticeCard item={item} key={index} />),
    [practices],
  );

const renderMyPractice = useCallback(() => {
    const myPractices = practices?.filter((item) => item.isPurchased);
    
    if (!myPractices?.length) {
      return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <Typography type='body-lg' className="text-brown-primary mb-2">
            У вас пока нет купленных практик
          </Typography>
          <Typography type="body-s" className="text-brown-secondary">
            Перейдите во вкладку "Практики" или "Коллеции", чтобы выбрать подходящие
          </Typography>
        </div>
      );
    }
    
    return myPractices.map((item, index) => <PracticeCard item={item} key={index} />);
  }, [practices]);

  return (
    <div className="grid gap-4 w-full">
      <div className="flex justify-center">
        <Tabs
          aria-label="Tabs radius"
          radius={"full"}
          onSelectionChange={(e) =>
            setActiveTab(e as "my" | "bundle" | "practice")
          }
          classNames={{
            tabList: "bg-white-tertiary",
            tabContent: "group-data-[selected=true]:text-beige-primary",
          }}
        >
          <Tab key="my" title="Мои" />
          <Tab key="bundle" title="Коллекции" />
          <Tab key="practice" title="Практики" />
        </Tabs>
      </div>
      <>{activeTab === "my" && renderMyPractice()}</>
      <>{activeTab === "bundle" && renderBundleList()}</>
      <>{activeTab === "practice" && renderPracticList()}</>
    </div>
  );
};
