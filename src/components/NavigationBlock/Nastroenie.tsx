import { Block } from "../Block";
import { Chip } from "../Chip";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

export const Nastroenie = () => {
  return (
    <Block>
      <div className="flex justify-between items-center">
        <Typography
          type="heading-xs"
          className="text-[var(--plots-text-brown-primary)]"
        >
          Как ваше настроение сегодня?
        </Typography>
      </div>
      <div className="flex justify-center gap-2 flex-wrap">
        <Chip
          color="--background-beige-tertiary"
          icon={<Icon name="Super" width={18} height={18} />}
          name="Супер"
        />
        <Chip
          color="--background-beige-tertiary"
          icon={<Icon name="Good" width={18} height={18} />}
          name="Хорошо"
        />
        <Chip
          color="--background-beige-tertiary"
          icon={<Icon name="Normal" width={18} height={18} />}
          name="Норм"
        />
        <Chip
          color="--background-beige-tertiary"
          icon={<Icon name="Sad" width={18} height={18} />}
          name="Плохо"
        />
        <Chip
          color="--background-beige-tertiary"
          icon={<Icon name="Terrible" width={18} height={18} />}
          name="Ужасно"
        />
      </div>
    </Block>
  );
};
