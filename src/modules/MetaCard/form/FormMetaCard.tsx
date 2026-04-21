import { type ReactNode } from "react";
import { Form } from "react-final-form";
import { FORM_ID } from "./FormMetaCard.constant";
import { TMetaCardForm } from "./FormMetaCard.types";

export const FormMetaCard = ({
  children,
  onSubmit,
  initialValue,
}: {
  children: ReactNode;
  onSubmit: (e: TMetaCardForm) => void;
  initialValue: TMetaCardForm;
}) => {
  return (
    <Form initialValues={initialValue} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form id={FORM_ID} onSubmit={handleSubmit}>
          {children}
        </form>
      )}
    </Form>
  );
};
