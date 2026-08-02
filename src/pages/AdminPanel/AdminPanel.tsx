import { useNavigate } from "react-router";
import { useGetAuth } from "../../hooks";
import { useEffect, useState } from "react";
import { ROUTES } from "../../containers";
import {
  HistoryNotification,
  SendNotification,
} from "../../modules/AdminPanel";
import { Tab, Tabs } from "@heroui/tabs";
import { Typography } from "../../components/Typography";

export const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<"notify" | "other">("notify");
  const { data, isLoading } = useGetAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !data?.isAdmin) {
      navigate(ROUTES.MAIN);
    }
  }, [isLoading, data]);

  return (
    <div className="grid gap-4 w-full">
      <Tabs
        aria-label="Tabs radius"
        radius={"full"}
        onSelectionChange={(e) => setActiveTab(e as "notify" | "other")}
        classNames={{
          tabList: "bg-white-tertiary",
          tabContent: "group-data-[selected=true]:text-beige-primary",
        }}
      >
        <Tab key="notify" title="Уведомления" />
        <Tab key="other" title="other" />
      </Tabs>

      <>
        {activeTab === "notify" && (
          <div className="grid gap-4 w-full">
            <SendNotification />
            <Typography type="body-md" className="text-brown-primary">История уведомлений</Typography>
            <HistoryNotification />
          </div>
        )}
      </>
      <>{activeTab === "other" && <div></div>}</>
    </div>
  );
};
