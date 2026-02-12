import { Block } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { Typography } from "../../components/Typography";
import { DailyQuestionSheet } from "./DailyQuestionSheet";
import { TDailyQuestion } from "../../api";
import { Chip } from "../../components/Chip";
import { getTime } from "../../utils";
import { useDrawerContext } from "../../components/Drawer";
import { useCallback } from "react";

type Props = {
  data?: TDailyQuestion;
};

export const DailyQuestionCard = ({ data }: Props) => {
  const { openDrawer, closeDrawer } = useDrawerContext();

  const handleOpenDailyQuestionSheet = useCallback(() => {
    openDrawer({
      title: "Вопрос дня",
      content: <DailyQuestionSheet onClose={closeDrawer} question={data} />,
    });
  }, [openDrawer, closeDrawer]);

  return (
    <Block onClick={handleOpenDailyQuestionSheet} className="shadow-lg">
      <div className="flex justify-between items-center">
        <Typography className="text-brown-primary" type="heading-xs">
          Вопрос дня
        </Typography>
        <Icon name="ChevronRight" width={24} height={24} />
      </div>
      <Typography className="text-brown-primary" type="body-s">
        Ваша ежедневная порция рефлексии.
      </Typography>
      {!!data?.createdAt && (
        <div className="flex">
          <Chip label={getTime(data.createdAt)} />
        </div>
      )}
    </Block>
  );
};
