import { useField } from "react-final-form";
import { Textarea } from "../../../components/Input";
import { EMoodField } from "../form/FormMood.types";

export const InputText = () => {
  const { input, meta } = useField(EMoodField.COMMENT);

  return <Textarea input={input} meta={meta} maxLength={1000} placeholder="Добавить комментарий..."/>;
};
