import { Block } from "../Block";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

export const Blagodarnost = () => {
  return (
    <Block onClick={() => alert("Blagodarnost")}>
      <div className="flex justify-between items-center">
        <Typography
          className="text-[var(--plots-text-brown-primary)]"
          type="heading-xs"
        >
          Благодарность
        </Typography>
        <Icon name="ChevronRight" width={24} height={24} />
      </div>
      <Typography
        className="text-[var(--plots-text-brown-primary)]"
        type="body-s"
      >
        Фокус на приятных мелочах помогает бороться с тревогой и беспокойством.
      </Typography>
    </Block>
  );
};
