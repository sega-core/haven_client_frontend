import { Typography } from "../../../components/Typography";
import { Button } from "@heroui/button";
import { Sheet } from "../../../components/Sheet";
import { FormMood } from "../form/FormMood";
import { SelectMood } from "../field/SelectMood";
import { SelectTags } from "../field/SelectTag";
import { InputText } from "../field/InputText";
import { EMoodField, TMoodForm } from "../form/FormMood.types";
import { useCreateMood } from "../../../hooks";

export const MoodSheet = ({
  isOpen,
  onClose,
  initialLevel,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialLevel: number;
}) => {
  const { mutateAsync, isPending } = useCreateMood();

  const onSubmit = async (values: TMoodForm) => {
    try {
      const {
        [EMoodField.LEVEL]: level = initialLevel,
        [EMoodField.TAGS]: tags = [],
        [EMoodField.COMMENT]: comment = "",
      } = values;

      await mutateAsync({
        level,
        tags,
        comment,
      });
      
    } catch (error) {
      alert(error);
    } finally {
      onClose();
    }
  };

  return (
    <Sheet isOpen={isOpen} onClose={onClose} title="Трекер настроения">
      <FormMood
        initialValue={{ [EMoodField.LEVEL]: initialLevel }}
        onSubmit={onSubmit}
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
            isLoading={isPending}
          >
            Сохранить
          </Button>
        </div>
      </FormMood>
    </Sheet>
  );
};
