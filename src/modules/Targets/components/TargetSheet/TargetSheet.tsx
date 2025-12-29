import { Button } from "@heroui/button";
import { Sheet } from "../../../../components/Sheet";
import { Typography } from "../../../../components/Typography";
import { Switch } from "@heroui/switch";
import { FormTarget } from "../../form/FormTarget";
import { InputDate, InputName, InputTime } from "../../fields";
import { INITIAL_FORM } from "../../form/FormTarget.constant";
import { useState } from "react";
import { DayPanel } from "../DayPanel";
import { ColorPanel } from "../ColorPanel";

export const TargetSheet = ({
  isOpen,
  onClose,
  type,
}: {
  isOpen: boolean;
  onClose: () => void;
  type: "add" | "edit";
}) => {
  const title = type === "add" ? "Создание цели" : "Редактирование цели";

  const [isToggle, setIsToggle] = useState(false);

  return (
    <Sheet isOpen={isOpen} onClose={onClose} title={title}>
      <FormTarget onSubmit={(e) => console.log(e)} initialValue={INITIAL_FORM}>
        <div className="grid gap-4 bg-white-primary p-4">
          <InputName />
          <div className="flex gap-2">
            <InputDate />
          </div>
          <Typography type="body-md" className="text-brown-primary">
            Цвет цели
          </Typography>
          <ColorPanel />
          <div className="flex gap-2.5">
            <Switch onChange={() => setIsToggle((prev) => !prev)} />
            <Typography type="heading-xs" className="text-brown-primary">
              Установить напоминание
            </Typography>
          </div>
          {isToggle && <DayPanel />}
          {isToggle && <InputTime />}
          <Button
            radius="full"
            className="bg-beige-primary text-white"
            type="submit"
          >
            Сохранить
          </Button>
        </div>
      </FormTarget>
    </Sheet>
  );
};
