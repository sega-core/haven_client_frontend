import { type ReactNode } from "react";
import { Form } from "react-final-form";
import { FORM_ID } from "./FormMood.constant";
import { TMoodForm } from "./FormMood.types";

export const FormMood = ({
  children,
  onSubmit,
  initialValue,
}: {
  children: ReactNode;
  onSubmit: (e: TMoodForm) => void;
  initialValue: TMoodForm;
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
