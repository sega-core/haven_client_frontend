import { Typography } from "../../../components/Typography";
import { Button } from "@heroui/button";
import { Sheet } from "../../../components/Sheet";
import { FormMood } from "../form/FormMood";
import { SelectMood } from "../field/SelectMood";
import { SelectTags } from "../field/SelectTag";
import { InputText } from "../field/InputText";

export const MoodSheet = ({
  isOpen,
  onClose,
  initialLevel,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialLevel?: number;
}) => {
  return (
    <Sheet isOpen={isOpen} onClose={onClose} title="Трекер настроения">
      <FormMood
        initialValue={{ LEVEL: initialLevel }}
        onSubmit={(e) => console.log(e)}
      >
        <div className="grid gap-4 bg-white-primary p-4">
          <Typography type="body-s">Моё настроение</Typography>
          <SelectMood />
          <Typography type="body-s">Мои эмоции и чувства</Typography>
          <SelectTags />
          <InputText />
          <Button
            radius="full"
            className="bg-beige-primary text-white"
            type="submit"
          >
            Сохранить
          </Button>
        </div>
      </FormMood>
    </Sheet>
  );
};
