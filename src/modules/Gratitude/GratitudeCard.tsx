import { useState } from "react";
import { Block } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { Typography } from "../../components/Typography";
import { GratitudeSheet } from "./GratitudeSheet";

export const GratitudeCard = () => {
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
        <Typography className="text-brown-primary" type="heading-xs">
          Благодарность
        </Typography>
        <Icon name="ChevronRight" width={24} height={24} />
      </div>
      <Typography className="text-brown-primary" type="body-s">
        Фокус на приятных мелочах помогает бороться с тревогой и беспокойством.
      </Typography>
      <GratitudeSheet isOpen={isOpen} onClose={onClose} />
    </Block>
  );
};
