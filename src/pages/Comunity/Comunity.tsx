import { Typography } from "../../components/Typography";
import { Group } from "../../modules/Comunity";

export const Comunity = () => {
  return (
    <div className="grid gap-4 w-full">
      <Typography type="body-s" className="text-brown-primary">
        Приветствуем в Haven! Вы среди друзей, которые понимают вас без слов.
      </Typography>
      <Group/>
    </div>
  );
};
