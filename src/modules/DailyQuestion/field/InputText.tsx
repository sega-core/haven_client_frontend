import { useField } from "react-final-form";
import { EDailyQuestionField } from "../form/FormDailyQuestion.types";
import { Textarea } from "../../../components/Input";
import { DEFAULT_ERROR_MSG } from "../../../constats";

export const InputText = () => {
  const { input, meta } = useField(EDailyQuestionField.ANSWER, {
    validate: (v) => {
      if (!v) return DEFAULT_ERROR_MSG;
    },
  });

  return <Textarea input={input} meta={meta} />;
};
