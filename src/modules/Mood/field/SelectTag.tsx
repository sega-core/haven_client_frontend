import { useField } from "react-final-form";
import { EMoodField } from "../form/FormMood.types";
import { Chip } from "../../../components/Chip";
import { MOOD_TAGS_MAP } from "../Mood.constants";

export const SelectTags = () => {
  const { input } = useField(EMoodField.TAGS, {
    type: "checkbox",
    multiple: true,
  });
  const { input: inputLelev } = useField(EMoodField.LEVEL, { type: "radio" });

  const TAGS_FOR_LEVEL = Object.entries(MOOD_TAGS_MAP)
    .filter(([, tag]) => tag.level === inputLelev.value)
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

    // Если тег уже выбран - убираем его
    if (currentTags.includes(tagId)) {
      input.onChange(currentTags.filter((id) => id !== tagId));
      return;
    }

    // Если уже выбрано 3 тега - не добавляем новый
    if (currentTags.length >= 3) {
      // Можно показать уведомление или просто игнорировать
      alert("Максимум 3 тега");
      return;
    }

    // Добавляем новый тег
    input.onChange([...currentTags, tagId]);
  };

  return (
    <div className="flex justify-center gap-2 flex-wrap">
      {TAGS_FOR_LEVEL.map((item) => {
        const isSelected = selectedTags.includes(item.id);
        /*           const isDisabled = !isSelected && selectedTags.length >= 3;
         */
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
  );
};
