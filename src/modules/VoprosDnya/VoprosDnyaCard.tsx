import { useState } from "react";
import { Block } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { Typography } from "../../components/Typography";
import { VoprosDnyaSheet } from "./VoprosDnyaSheet";

export const VoprosDnyaCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Block onClick={onOpen}>
      <div className="flex justify-between items-center">
        <Typography
          className="text-(--plots-text-brown-primary)"
          type="heading-xs"
        >
          Вопрос дня
        </Typography>
        <Icon name="ChevronRight" width={24} height={24} />
      </div>
      <Typography className="text-(--plots-text-brown-primary)" type="body-s">
        Ваша ежедневная порция рефлексии.
      </Typography>
      <VoprosDnyaSheet isOpen={isOpen} onClose={onClose} />
    </Block>
  );
};
