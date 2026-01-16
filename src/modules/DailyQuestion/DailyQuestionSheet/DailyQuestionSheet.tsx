import { Button } from "@heroui/button";
import { Sheet } from "../../../components/Sheet";
import { Typography } from "../../../components/Typography";
import { Textarea } from "@heroui/input";

export const DailyQuestionSheet = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Sheet isOpen={isOpen} onClose={onClose} title="Вопрос дня">
      <div className="grid gap-4 bg-white-primary p-4">
        <Typography type="body-s" className="text-brown-primary text-center">
          Что вы можете отпустить сейчас, чтобы почувствовать лёгкость?
        </Typography>
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
