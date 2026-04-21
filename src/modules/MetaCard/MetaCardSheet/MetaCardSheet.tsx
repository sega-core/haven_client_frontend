import { Button } from "@heroui/button";
import { Typography } from "../../../components/Typography";
import { INITIAL_FORM } from "../form/FormMetaCard.constant";
import { InputText } from "../field/InputText";
import { EMetaCardField, TMetaCardForm } from "../form/FormMetaCard.types";
import { FormMetaCard } from "../form/FormMetaCard";
import MetaphoricalCards, { ShuffleCards } from "../Test";

export const MetaCardSheet = ({
  onClose,
}: {
  onClose: () => void;
}) => {

  const onSubmit = async (values: TMetaCardForm) => {
    /* try {
      await mutateAsync(values[EMetaCardField.COMMENT]);
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
    } */
  };


  return (
    <FormMetaCard onSubmit={onSubmit} initialValue={INITIAL_FORM}>
      <div className="grid gap-4 bg-white-primary">
       <InputText field={EMetaCardField.SEEN} />
       <InputText field={EMetaCardField.FELT} />
       <InputText field={EMetaCardField.UNDERSTOOD} />
        <Button
            radius="full"
            className="bg-beige-primary text-white"
            type="submit"
/*             isLoading={isPending}
 */          >
            Сохранить
          </Button>
      </div>
    </FormMetaCard>
  );
};
