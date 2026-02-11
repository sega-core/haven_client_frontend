import { useCallback, useState } from "react";
import { PracticeBundleCard, PracticeCard } from "../../modules/Practice";
import { useGetPractice, useGetPracticeBundle } from "../../hooks";
import { Tabs, Tab } from "@heroui/tabs";

export const Practice = () => {
  const [activeTab, setActiveTab] = useState<"my" | "bundle" | "practice">(
    "my",
  );
  const { data: bundles } = useGetPracticeBundle();
  const { data: practices2 } = useGetPractice();

  console.log(practices2)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const practices = [
    {
        "id": 1,
        "title": "Зеркало проекций",
        "subTitle": "Осознание переносов и работа с проекциями",
        "description": "Эта практика помогает заметить, какие качества и чувства мы бессознательно «переносим» на других людей. Всё, что сильно задевает, восхищает или раздражает в окружающих, часто говорит о наших собственных внутренних процессах. В практике ты научишься видеть эти отражения и мягко возвращать внимание к себе — без самокритики и осуждения. Это помогает лучше понимать свои реакции, снижать конфликты и глубже узнавать себя.",
        "tags": [],
        "priceZen": 130,
        "isActive": true,
        "createdAt": "2026-02-07T15:27:37.285Z",
        "updatedAt": "2026-02-07T15:27:37.285Z",
        "isPurchased": true
    },
]

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
      practices
        ?.filter((item) => item.isPurchased)
        .map((item, index) => <PracticeCard item={item} key={index} />),

    [practices],
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
