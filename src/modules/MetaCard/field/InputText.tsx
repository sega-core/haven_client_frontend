import { useField } from "react-final-form";
import { EMetaCardField } from "../form/FormMetaCard.types";
import { Textarea } from "../../../components/Input";
import { DEFAULT_ERROR_MSG } from "../../../constats";
import { FIELD_LABEL_MAP } from "../form/FormMetaCard.constant";
import { Typography } from "../../../components/Typography";

export const InputText = ({
  field,
  readOnly,
}: {
  field: EMetaCardField;
  readOnly?: boolean;
}) => {
  const { input, meta } = useField(field, {
    validate: (v) => {
      if (!v) return DEFAULT_ERROR_MSG;
    },
  });

  return (
    <div>
      {readOnly && (
        <Typography type="body-md" className="text-brown-primary mb-2">
          {FIELD_LABEL_MAP[field]}
        </Typography>
      )}
      <Textarea
        placeholder={FIELD_LABEL_MAP[field]}
        input={input}
        meta={meta}
        isRequired
        maxLength={50}
        rows={2}
        readOnly={readOnly}
      />
    </div>
  );
};
