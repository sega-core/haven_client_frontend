import { Typography } from "../../components/Typography";
import { Calendar } from "../../modules/Arhive";

export const Archive = () => {
  return (
    <div className="grid gap-4 w-full">
      <Typography type="body-s" className="text-brown-primary">
        Просматривайте и анализируйте все свои записи за любой период{" "}
      </Typography>
      <Calendar />
    </div>
  );
};
