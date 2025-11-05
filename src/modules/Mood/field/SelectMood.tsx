import { useField } from "react-final-form";
import { EMoodField } from "../form/FormMood.types";
import { Chip } from "../../../components/Chip";
import { MOOD_CHIPS } from "../Mood.constants";
import { Icon } from "../../../components/Icon";

export const SelectMood = () => {
  const { input } = useField(EMoodField.LEVEL, {
    type: "radio",
    validate: (v) => {
      if (!v) return "SelectMoodError";
    },
  });

  return (
    <div className="flex justify-center gap-2 flex-wrap">
      {MOOD_CHIPS.map((item) => (
        <Chip
          key={item.id}
          icon={<Icon name={item.iconId} width={18} height={18} />}
          label={item.label}
          onClick={() => input.onChange(item.id)}
          variant={item.id === input.value ? "flat" : "solid"}
        />
      ))}
    </div>
  );
};
