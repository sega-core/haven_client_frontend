import { TextArea } from "../../../components/Input";
import { Button } from "@heroui/button";
import { Sheet } from "../../../components/Sheet";

export const BlagodarnostSheet = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Sheet isOpen={isOpen} onClose={onClose} title="Трекер благодарности">
      <div className="grid gap-4 bg-(--background-white-primary) p-4">
        <TextArea placeholder="Добавить комментарий" />
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
