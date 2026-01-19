import { useField } from "react-final-form";
import { EDailyQuestionField } from "../form/FormDailyQuestion.types";
import { TextArea } from "../../../components/Input";

export const InputText = () => {
  const { input, meta } = useField(EDailyQuestionField.ANSWER, {
    validate: (v) => {
      if (!v) return "InputTextError";
    },
  });

  return (
    <TextArea
      {...input}
      {...(meta.touched && meta.error && { isInvalid: true })}
    />
  );
};
