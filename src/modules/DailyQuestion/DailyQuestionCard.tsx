import { useCallback, useState } from "react";
import { Block } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { Typography } from "../../components/Typography";
import { DailyQuestionSheet } from "./DailyQuestionSheet";
import { TDailyQuestion } from "../../api";

type Props = {
  data?: TDailyQuestion;
};

export const DailyQuestionCard = ({ data }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  return (
    <Block onClick={onOpen}>
      <div className="flex justify-between items-center">
        <Typography className="text-brown-primary" type="heading-xs">
          Вопрос дня
        </Typography>
        <Icon name="ChevronRight" width={24} height={24} />
      </div>
      <Typography className="text-brown-primary" type="body-s">
        Ваша ежедневная порция рефлексии.
      </Typography>
      <DailyQuestionSheet isOpen={isOpen} onClose={onClose} question={data} />
    </Block>
  );
};
