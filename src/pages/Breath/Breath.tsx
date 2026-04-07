import { Typography } from "../../components/Typography";
import { BreathCard } from "../../modules/Breath";

export const Breath = () => {
  return (
    <div className="grid gap-4 w-full">
      <Typography type="body-s" className="text-brown-primary">
        Остановите внутренний диалог и верните контроль над эмоциями за
        несколько минут
      </Typography>
      <BreathCard />
    </div>
  );
};
