import { Field } from "react-final-form";
import { COLORS } from "./ColorPanel.constant";
import { ColorCheckbox } from "../../../../components/ColorCheckbox";
import { ETargetField } from "../../form";

export const ColorPanel = () => {
  return (
    <Field name={ETargetField.COLOR}>
      {({ input }) => (
        <div className="flex flex-wrap gap-2 items-center">
          {COLORS.map(({ value, id, color }) => (
            <ColorCheckbox
              key={id}
              checked={input.value === value}
              value={value}
              color={color}
              onChange={() => input.onChange(value)}
            />
          ))}
        </div>
      )}
    </Field>
  );
};
