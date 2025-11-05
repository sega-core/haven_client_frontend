import { type ReactNode } from "react";
import { Form } from "react-final-form";
import { FORM_ID } from "./FormGratitude.constant";
import { TGratitudeForm } from "./FormGratitude.types";

export const FormGratitude = ({
  children,
  onSubmit,
  initialValue,
}: {
  children: ReactNode;
  onSubmit: (e: TGratitudeForm) => void;
  initialValue: TGratitudeForm;
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
