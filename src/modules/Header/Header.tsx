import { Avatar } from "../../components/Avatar";
import { Typography } from "../../components/Typography";
import { CoinBalance } from "./components";
import { useRouteTitle } from "./hooks/useRouteTitle";

export const Header = () => {
  const { title } = useRouteTitle();

  return (
    <div className="flex justify-between w-full items-center">
      <Typography
        type="heading-s"
        className="text-brown-primary"
        weight="semibold"
      >
        {title}
      </Typography>
      <div className="flex gap-4">
        <CoinBalance />
        <Avatar />
      </div>
    </div>
  );
};
