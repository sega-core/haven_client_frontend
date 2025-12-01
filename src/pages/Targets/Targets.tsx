import { useState } from "react";
import { TargetItem } from "../../modules/Targets";
import { TargetSheet } from "../../modules/Targets";
import { Button } from "@heroui/button";

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
      <TargetItem />
      <TargetItem />
      <TargetItem />
      <Button onPress={onOpen}></Button>
      <TargetSheet isOpen={isOpen} onClose={onClose} type={"add"} />
    </div>
  );
};
