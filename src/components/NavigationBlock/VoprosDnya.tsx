import { Block } from "../Block";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

export const VoprosDnya = () => {
  return (
    <Block onClick={() => alert("VoprosDnya")}>
      <div className="flex justify-between items-center">
        <Typography type="heading-xs">Вопрос дня</Typography>
        <Icon name="ChevronRight" width={24} height={24} />
      </div>
      <Typography type="body-s">Ваша ежедневная порция рефлексии.</Typography>
    </Block>
  );
};
