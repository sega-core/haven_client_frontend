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
import { Sheet } from "../../../components/Sheet";

export const NastroenieSheet = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Sheet isOpen={isOpen} onClose={onClose} title="Трекер настроения">
      <div className="grid gap-4 bg-white-primary p-4">
        <Typography type="body-s">Моё настроение</Typography>
        <div className="flex justify-center gap-2 flex-wrap">
          {NASTROENIE_CHIPS.map((item) => (
            <Chip
              key={item.id}
              color="bg-beige-tertiary"
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
              color="bg-beige-tertiary"
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
              color="bg-beige-tertiary"
              label={item.label}
              onClick={() => console.log(item.id)}
            />
          ))}
        </div>
        <Textarea
          label="Добавить комментарий..."
          classNames={{
            inputWrapper: "bg-beige-tertiary transition-colors duration-200",
            input:
              "bg-transparent text-white placeholder:text-gray-400 text-white",
            description: "bg-beige-tertiary",
          }}
        />
        <Button radius="full" className="bg-beige-primary text-white">
          Сохранить
        </Button>
      </div>
    </Sheet>
  );
};
