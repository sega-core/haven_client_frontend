import { Button } from "@heroui/button";
import { Typography } from "../../../components/Typography";
import { FormGratitude } from "../form/FormGratitude";
import { INITIAL_FORM } from "../form/FormGratitude.constant";
import { InputText } from "../field/InputText";
import { useCreateGratitude } from "../../../hooks";
import { EGratitudeField, TGratitudeForm } from "../form/FormGratitude.types";
import { TGratitude } from "../../../api";
import { BlockAnswer } from "../../../components/BlockAnswer";

export const GratitudeSheet = ({
  onClose,
  gratitudes,
}: {
  onClose: () => void;
  gratitudes: TGratitude[];
}) => {
  const { mutateAsync, isPending } = useCreateGratitude();

  const onSubmit = async (values: TGratitudeForm) => {
    try {
      await mutateAsync(values[EGratitudeField.COMMENT]);
    } catch (error) {
      alert(error);
    } finally {
      onClose();
    }
  };

  const isCompleted = gratitudes.length >= 3;

  return (
    <FormGratitude onSubmit={onSubmit} initialValue={INITIAL_FORM}>
      <input className="border-1"/>
      <div className="grid gap-4 bg-white-primary">
        <Typography type="body-s" className="text-brown-primary text-center">
          За что вы благодарны сегоднящнему дню?
        </Typography>
        {!isCompleted && <InputText />}
        {!!gratitudes.length &&
          gratitudes.map(({ comment, createdAt }, index) => (
            <BlockAnswer key={index} comment={comment} date={createdAt} />
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
  );
};
