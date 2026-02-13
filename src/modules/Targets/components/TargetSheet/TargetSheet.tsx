import { Button } from "@heroui/button";
import { Typography } from "../../../../components/Typography";
import { Switch } from "@heroui/switch";
import { FormTarget } from "../../form/FormTarget";
import { InputDate, InputName, InputTime } from "../../fields";
import { INITIAL_FORM } from "../../form/FormTarget.constant";
import { useState } from "react";
import { DayPanel } from "../DayPanel";
import { ColorPanel } from "../ColorPanel";
import { useCreateTarget } from "../../../../hooks";
import { ETargetField, TTargetForm } from "../../form";

export const TargetSheet = ({ onClose }: { onClose: () => void }) => {
  const [isToggle, setIsToggle] = useState(false);

  const { mutateAsync, isPending } = useCreateTarget();

  const onSubmit = async (values: TTargetForm) => {
    try {
      const title = values[ETargetField.TITLE];
      const startDate = values[ETargetField.START_DATE] || "";
      const endDate = values[ETargetField.END_DATE] || "";
      const weekdays = Object.entries(values[ETargetField.WEEKDAYS] || {})
        .filter(([, isTrue]) => isTrue)
        .map(([day]) => day);
      const notifyTime = values[ETargetField.NOTIFICATION_TIME];

      await mutateAsync({
        title,
        startDate,
        endDate,
        weekdays,
        notifyTime,
      });
    } catch (error) {
      alert(error);
    } finally {
      onClose();
    }
  };

  return (
    <FormTarget onSubmit={onSubmit} initialValue={INITIAL_FORM}>
      <div className="grid gap-4 bg-white-primary">
        <InputName />
        <div className="flex gap-4 w-full justify-between">
          <InputDate type="start" />
          <InputDate type="end" />
        </div>
        <Typography type="body-md" className="text-brown-primary">
          Цвет цели
        </Typography>
        <ColorPanel />
        <Typography type="body-md" className="text-brown-primary">
          Дни цели
        </Typography>
        <DayPanel />
        <div className="flex gap-2.5">
          <Switch onChange={() => setIsToggle((prev) => !prev)} />
          <Typography type="heading-xs" className="text-brown-primary">
            Установить напоминание
          </Typography>
        </div>
        {isToggle && <InputTime />}
        <Button
          radius="full"
          className="bg-beige-primary text-white"
          type="submit"
          isLoading={isPending}
        >
          Сохранить
        </Button>
      </div>
    </FormTarget>
  );
};
