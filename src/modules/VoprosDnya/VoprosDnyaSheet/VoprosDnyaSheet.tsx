import { TextArea } from "../../../components/Input";
import { Button } from "@heroui/button";
import { Sheet } from "../../../components/Sheet";
import { Typography } from "../../../components/Typography";

export const VoprosDnyaSheet = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Sheet isOpen={isOpen} onClose={onClose} title="Вопрос дня">
      <div className="grid gap-4 bg-(--background-white-primary) p-4">
        <Typography
          type="body-s"
          className="text-(--plots-text-brown-primary) text-center"
        >
          Что вы можете отпустить сейчас, чтобы почувствовать лёгкость?
        </Typography>
        <TextArea placeholder="Добавить комментарий..." />
        <Button
          radius="full"
          className="bg-(--background-beige-primary) text-white"
        >
          Сохранить
        </Button>
      </div>
    </Sheet>
  );
};
