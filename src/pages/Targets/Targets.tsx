import { useState } from "react";
import { TargetItem } from "../../modules/Targets";
import { TargetSheet } from "../../modules/Targets";
import { Button } from "@heroui/button";
import { Typography } from "../../components/Typography";

export const Targets = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="grid gap-4 w-full">
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex flex-col items-center gap-4">
        <Typography type="heading-s" className="text-brown-primary">
          Начните создавать свои цели
        </Typography>
        <Button
          onPress={onOpen}
          radius="full"
          className="bg-white-primary text-beige-primary"
        >
          Добавить
        </Button>
      </div>
      <TargetItem />
      <TargetItem />
      <TargetSheet isOpen={isOpen} onClose={onClose} type={"add"} />
    </div>
  );
};
