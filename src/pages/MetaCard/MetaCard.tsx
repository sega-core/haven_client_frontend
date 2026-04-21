import { Typography } from "../../components/Typography";
import { MetaCardBanner } from "../../modules/MetaCard";

export const MetaCard = () => {
  return (
    <div className="grid gap-4 w-full">
      <Typography type="body-s" className="text-brown-primary">
       Ключ к вашему бессознательному. Образы, которые говорят за вас.
      </Typography>
      <MetaCardBanner />
    </div>
  );
};
