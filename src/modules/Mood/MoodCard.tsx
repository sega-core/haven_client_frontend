import { useCallback, useState } from "react";
import { Block } from "../../components/Block";
import { Chip } from "../../components/Chip";
import { Icon } from "../../components/Icon";
import { Typography } from "../../components/Typography";
import { MOOD_CHIPS } from "./Mood.constants";
import { MoodSheet } from "./MoodSheet";
import { useGetMoodTags } from "../../hooks";

export const MoodCard = () => {
  const [moodData, setMoodData] = useState<{
    isOpen: boolean;
    initialLevel?: number;
  }>({
    isOpen: false,
  });

  const onOpen = useCallback(
    (initialLevel: number) =>
      setMoodData((prev) => ({ ...prev, isOpen: true, initialLevel })),
    [],
  );
  const onClose = useCallback(() => setMoodData({ isOpen: false }), []);

  useGetMoodTags();

  return (
    <Block>
      <div className="flex justify-between items-center">
        <Typography type="heading-xs" className="text-brown-primary">
          Как ваше настроение сегодня?
        </Typography>
      </div>
      <div className="flex justify-center gap-2 flex-wrap">
        {MOOD_CHIPS.map((item) => (
          <Chip
            key={item.id}
            icon={<Icon name={item.iconId} width={18} height={18} />}
            label={item.label}
            onClick={() => onOpen(item.id)}
            variant={item.id === moodData.initialLevel ? 'flat':'solid'}
          />
        ))}
      </div>
      <MoodSheet
        isOpen={moodData.isOpen}
        onClose={onClose}
        initialLevel={moodData.initialLevel}
      />
    </Block>
  );
};
