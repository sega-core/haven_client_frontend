import { Typography } from "../../../components/Typography";
import { Button } from "@heroui/button";
import { FormMood } from "../form/FormMood";
import { SelectMood } from "../field/SelectMood";
import { SelectTags } from "../field/SelectTag";
import { InputText } from "../field/InputText";
import { EMoodField, TMoodForm } from "../form/FormMood.types";
import { useCreateMood } from "../../../hooks";

export const MoodSheet = ({
  onClose,
  initialLevel,
}: {
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
      console.error(error);
    } finally {
      onClose();
    }
  };

  return (
    <FormMood
      initialValue={{ [EMoodField.LEVEL]: initialLevel }}
      onSubmit={onSubmit}
    >
      <div className="grid gap-4 bg-white-primary">
        <Typography type="body-s" className="text-brown-primary ">Моё настроение</Typography>
        <SelectMood />
        <Typography type="body-s" className="text-brown-primary ">Мои эмоции и чувства</Typography>
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
  );
};
