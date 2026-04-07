import { useCallback } from "react";
import { Block } from "../../components/Block";
import { useDrawerContext } from "../../components/Drawer";
import { Icon } from "../../components/Icon";
import { Typography } from "../../components/Typography";
import { BreathWidget } from "./BreathWidget";

export const BreathCard = () => {
  const { openDrawer, closeDrawer } = useDrawerContext();

  const handleOpenBreathSheet = useCallback(() => {
    openDrawer({
      title: "Квадратное дыхание",
      content: <BreathWidget/>,
    });
  }, [openDrawer, closeDrawer]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <Block onClick={handleOpenBreathSheet}>
        <Icon name="Lotus" />
        <Typography type={"heading-xs"} className="text-brown-primary">
          Квадратное дыхание
        </Typography>
      </Block>
      {/* <Block>
            <Icon name="Lotus" />
            <Typography type={"heading-xs"} className="text-brown-primary">
              Ровное <br /> дыхание
            </Typography>
          </Block>
          <Block>
            <Icon name="Lotus" />
            <Typography type={"heading-xs"} className="text-brown-primary">
              Дыхание <br />
              4-7-8
            </Typography>
          </Block> */}
    </div>
  );
};
