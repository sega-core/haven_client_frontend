import { Block } from "../../../components/Block";
import { Chip } from "../../../components/Chip";
import { Icon } from "../../../components/Icon";
import { Typography } from "../../../components/Typography";
import { NASTROENIE_CHIPS } from "../Nasctroenie.constants";
import { NastroenieSheet } from "../NastroenieSheet/NastroenieSheet";

export const NastroenieCard = () => {
  return (
    <Block>
      <div className="flex justify-between items-center">
        <Typography
          type="heading-xs"
          className="text-(--plots-text-brown-primary)"
        >
          Как ваше настроение сегодня?
        </Typography>
      </div>
      <div className="flex justify-center gap-2 flex-wrap">
        {NASTROENIE_CHIPS.map((item) => (
          <Chip
            key={item.id}
            color="--background-beige-tertiary"
            icon={<Icon name={item.iconId} width={18} height={18} />}
            label={item.label}
            onClick={() => console.log(item.id)}
          />
        ))}
      </div>
      <NastroenieSheet />
    </Block>
  );
};
