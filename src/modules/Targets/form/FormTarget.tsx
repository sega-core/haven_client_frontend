import { type ReactNode } from "react";
import { Form } from "react-final-form";
import { FORM_ID } from "./FormTarget.constant";
import { TTargetForm } from "./FormTarget.types";

export const FormTarget = ({
  children,
  onSubmit,
  initialValue,
}: {
  children: ReactNode;
  onSubmit: (e: TTargetForm) => void;
  initialValue: TTargetForm;
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
