import { useField } from "react-final-form";
import { EGratitudeField } from "../form/FormGratitude.types";
import { Textarea } from "../../../components/Input";
import { DEFAULT_ERROR_MSG } from "../../../constats";

export const InputText = () => {
  const { input, meta } = useField(EGratitudeField.COMMENT, {
    validate: (v) => {
      if (!v) return DEFAULT_ERROR_MSG;
    },
  });

  return <Textarea input={input} meta={meta} />;
};
