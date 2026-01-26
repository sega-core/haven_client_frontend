import { useField } from "react-final-form";
import { EMoodField } from "../form/FormMood.types";
import { Chip } from "../../../components/Chip";
import { MOOD_TAGS_MAP } from "../Mood.constants";
import { useEffect } from "react";

export const SelectTags = () => {
  const { input, meta } = useField(EMoodField.TAGS, {
    type: "checkbox",
    multiple: true,
    validate: (v) => {
      if (!v) return "SelectTagsError";
    },
  });
  const { input: inputLevel } = useField(EMoodField.LEVEL, { type: "radio" });

  useEffect(() => {
    if (selectedTags.length > 0) {
      input.onChange([]);
    }
  }, [inputLevel.value]);

  const TAGS_FOR_LEVEL = Object.entries(MOOD_TAGS_MAP)
    .filter(([, tag]) => tag.level === inputLevel.value)
    .map(([id, tag]) => ({
      id,
      label: tag.label,
    }));

  const selectedTags = Array.isArray(input.value)
    ? input.value
    : input.value
      ? [input.value]
      : [];

  const handleTagClick = (tagId: string) => {
    const currentTags = selectedTags;

    if (currentTags.includes(tagId)) {
      input.onChange(currentTags.filter((id) => id !== tagId));
      return;
    }

    if (currentTags.length >= 3) {
      alert("Максимум 3 тега");
      return;
    }

    input.onChange([...currentTags, tagId]);
  };

  return (
    <>
    <div className="flex justify-center gap-2 flex-wrap">
      {TAGS_FOR_LEVEL.map((item) => {
        const isSelected = selectedTags.includes(item.id);
        return (
          <Chip
            key={item.id}
            label={item.label}
            onClick={() => handleTagClick(item.id)}
            variant={isSelected ? "flat" : "solid"}
          />
        );
      })}
    </div>
     {meta.touched && meta.error && <div
        data-slot="error-message"
        className="text-tiny text-danger"
        id="react-aria3070100192-:ro:"
      >
        Выбирете хотя бы одну эмоцию или чувство
      </div>}
    </>
  );
};
