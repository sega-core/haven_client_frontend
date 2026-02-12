import { useCallback, useState } from "react";
import { Block } from "../../components/Block";
import { Chip } from "../../components/Chip";
import { Icon } from "../../components/Icon";
import { Typography } from "../../components/Typography";
import { MOOD_CHIPS, MOOD_TAGS_MAP } from "./Mood.constants";
import { MoodSheet } from "./MoodSheet";
import { TMood } from "../../api";

type Props = {
  data?: TMood;
};

export const MoodCard = ({ data }: Props) => {
  const [moodData, setMoodData] = useState<{
    isOpen: boolean;
    initialLevel: number;
  }>({
    isOpen: false,
    initialLevel: 0,
  });

  const onOpen = useCallback(
    (initialLevel: number) =>
      setMoodData((prev) => ({ ...prev, isOpen: true, initialLevel })),
    [],
  );
  const onClose = useCallback(
    () => setMoodData({ isOpen: false, initialLevel: 0 }),
    [],
  );

  const renderChips = useCallback(() => {
    const chipLevel = MOOD_CHIPS.find((item) => item.id === data?.level);
    return (
      <div className="flex gap-3 flex-wrap">
        {chipLevel && <Chip label={chipLevel.label} />}
        {data?.tags.map((item, index) => (
          <Chip label={MOOD_TAGS_MAP[item].label} key={index} />
        ))}
      </div>
    );
  }, [data]);

  return (
    <Block className="shadow-lg">
      <div className="flex justify-between items-center">
        <Typography type="heading-xs" className="text-brown-primary">
          Как ваше настроение сегодня?
        </Typography>
      </div>
      {!data?.level && <div className="flex justify-center gap-2 flex-wrap">
        {MOOD_CHIPS.map((item) => (
          <Chip
            key={item.id}
            icon={<Icon name={item.iconId} width={18} height={18} />}
            label={item.label}
            onClick={() => onOpen(item.id)}
            variant={item.id === moodData.initialLevel ? "flat" : "solid"}
          />
        ))}
      </div>}
      {!!data?.level && <div>{renderChips()}</div>}
      <MoodSheet
        isOpen={moodData.isOpen}
        onClose={onClose}
        initialLevel={moodData.initialLevel}
      />
    </Block>
  );
};
