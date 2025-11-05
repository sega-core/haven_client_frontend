import { type ReactNode } from "react";
import { Form } from "react-final-form";
import { FORM_ID } from "./FormDailyQuestion.constant";
import { TDailyQuestionForm } from "./FormDailyQuestion.types";

export const FormDailyQuestion= ({
  children,
  onSubmit,
  initialValue,
}: {
  children: ReactNode;
  onSubmit: (e: TDailyQuestionForm) => void;
  initialValue: TDailyQuestionForm;
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
