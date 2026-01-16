import { useState } from "react";
import { Block } from "../../components/Block";
import { Chip } from "../../components/Chip";
import { Icon } from "../../components/Icon";
import { Typography } from "../../components/Typography";
import { MOOD_CHIPS } from "./Mood.constants";
import { MoodSheet } from "./MoodSheet";

export const MoodCard = () => {
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
        <Typography type="heading-xs" className="text-brown-primary">
          Как ваше настроение сегодня?
        </Typography>
      </div>
      <div className="flex justify-center gap-2 flex-wrap">
        {MOOD_CHIPS.map((item) => (
          <Chip
            key={item.id}
            color="bg-beige-tertiary"
            icon={<Icon name={item.iconId} width={18} height={18} />}
            label={item.label}
            onClick={() => console.log(item.id)}
          />
        ))}
      </div>
      <MoodSheet isOpen={isOpen} onClose={onClose} />
    </Block>
  );
};
