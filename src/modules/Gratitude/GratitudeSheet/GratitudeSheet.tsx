import { Button } from "@heroui/button";
import { Sheet } from "../../../components/Sheet";
import { Typography } from "../../../components/Typography";
import { FormGratitude } from "../form/FormGratitude";
import { INITIAL_FORM } from "../form/FormGratitude.constant";
import { InputText } from "../field/InputText";
import { useCreateGratitude } from "../../../hooks";
import { EGratitudeField, TGratitudeForm } from "../form/FormGratitude.types";
import { CreatedGratitude } from "../components/CreatedGratitude";
import { TGratitude } from "../../../api";

export const GratitudeSheet = ({
  isOpen,
  onClose,
  gratitudes,
}: {
  isOpen: boolean;
  onClose: () => void;
  gratitudes: TGratitude[];
}) => {
  const { mutateAsync, isPending } = useCreateGratitude();

  const onSubmit = async (values: TGratitudeForm) => {
    try {
      await mutateAsync(values[EGratitudeField.TEXT]);
    } catch (error) {
      alert(error);
    } finally {
      onClose();
    }
  };

  const isCompleted = gratitudes.length >= 3;

  return (
    <Sheet isOpen={isOpen} onClose={onClose} title="Трекер благодарности">
      <FormGratitude onSubmit={onSubmit} initialValue={INITIAL_FORM}>
        <div className="grid gap-4 bg-white-primary p-4">
          <Typography type="body-s" className="text-brown-primary text-center">
            За что вы благодарны сегоднящнему дню?
          </Typography>
          {!isCompleted && <InputText />}
          {!!gratitudes.length &&
            gratitudes.map((item, index) => (
              <CreatedGratitude key={index} {...item} />
            ))}
          {!isCompleted && (
            <Button
              radius="full"
              className="bg-beige-primary text-white"
              type="submit"
              isLoading={isPending}
            >
              Сохранить
            </Button>
          )}
        </div>
      </FormGratitude>
    </Sheet>
  );
};
