import { useCallback, useState } from "react";
import { PracticeBundleCard, PracticeCard } from "../../modules/Practice";
import { useGetPractice, useGetPracticeBundle } from "../../hooks";
import { Tabs, Tab } from "@heroui/tabs";

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

  const renderMyPractice = useCallback(
    () =>
      bundles
        ?.flatMap((bundle) =>
          bundle.practiceBundleItems
            .map((item) => item.practice)
            .filter((practice) => practice?.isPurchased === true),
        )
        .map((item, index) => (
          <PracticeCard item={item} key={index} hidePurchasedChip />
        )),
    [bundles],
  );

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
