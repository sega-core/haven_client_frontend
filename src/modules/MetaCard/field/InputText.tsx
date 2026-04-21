import { useField } from "react-final-form";
import { EMetaCardField } from "../form/FormMetaCard.types";
import { Textarea } from "../../../components/Input";
import { DEFAULT_ERROR_MSG } from "../../../constats";
import { FIELD_LABEL_MAP } from "../form/FormMetaCard.constant";

export const InputText = ({ field }: { field: EMetaCardField }) => {
  const { input, meta } = useField(field, {
    validate: (v) => {
      if (!v) return DEFAULT_ERROR_MSG;
    },
  });

  return (
    <Textarea
      placeholder={FIELD_LABEL_MAP[field]}
      input={input}
      meta={meta}
      isRequired
      maxLength={50}
      rows={2}
    />
  );
};
