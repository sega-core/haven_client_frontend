import { Sheet } from "react-modal-sheet";
import { useState } from "react";
import { Typography } from "../../../components/Typography";
import { Chip } from "../../../components/Chip";
import {
  EMOTIONS_CHIPS,
  FEELS_CHIPS,
  NASTROENIE_CHIPS,
} from "../Nasctroenie.constants";
import { Icon } from "../../../components/Icon";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";

export const NastroenieSheet = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open sheet</button>

      <Sheet isOpen={isOpen} onClose={() => setOpen(false)} detent="content">
        <Sheet.Container>
          <Sheet.Header className="bg-(--background-white-primary)" />
          <Sheet.Content>
            <div className="grid gap-4 bg-(--background-white-primary) p-4">
              <div className="flex justify-center">
                <Typography type="heading-xs" className="text-blue-600">
                  Трекер настроения
                </Typography>
              </div>
              <Typography type="body-s">Моё настроение</Typography>
              <div className="flex justify-center gap-2 flex-wrap">
                {NASTROENIE_CHIPS.map((item) => (
                  <Chip
                    key={item.id}
                    color="--background-beige-tertiary"
                    icon={<Icon name={item.iconId} width={18} height={18} />}
                    label={item.label}
                    onClick={() => console.log(item.id)}
                  />
                ))}
              </div>
              <Typography type="body-s">Мои эмоции</Typography>
              <div className="flex justify-center gap-2 flex-wrap">
                {EMOTIONS_CHIPS.map((item) => (
                  <Chip
                    key={item.id}
                    color="--background-beige-tertiary"
                    label={item.label}
                    onClick={() => console.log(item.id)}
                  />
                ))}
              </div>
              <Typography type="body-s">Мои чувства</Typography>
              <div className="flex justify-center gap-2 flex-wrap">
                {FEELS_CHIPS.map((item) => (
                  <Chip
                    key={item.id}
                    color="--background-beige-tertiary"
                    label={item.label}
                    onClick={() => console.log(item.id)}
                  />
                ))}
              </div>
              <Textarea
                label="Добавить комментарий..."
                classNames={{
                  inputWrapper:
                    "bg-[var(--background-beige-tertiary)] transition-colors duration-200",
                  input:
                    "bg-transparent text-white placeholder:text-gray-400 text-white",
                  description: "bg-[var(--background-beige-tertiary)]",
                }}
              />
              <Button
                radius="full"
                className="bg-(--background-beige-primary) text-white"
              >
                Сохранить
              </Button>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
};
