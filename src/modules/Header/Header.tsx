import { Avatar } from "../../components/Avatar";
import { Typography } from "../../components/Typography";
import { useLaunchParamsTelegram } from "../../hooks";
import { CoinBalance } from "./components";
import { useRouteTitle } from "./hooks/useRouteTitle";

export const Header = () => {
  const { title } = useRouteTitle();

  const { tgWebAppData } = useLaunchParamsTelegram();

  const firstName = tgWebAppData?.user?.firstName;
  const photoUrl = tgWebAppData?.user?.photoUrl;

  return (
    <div className="flex justify-between w-full items-center">
      <Typography
        type="heading-s"
        className="text-brown-primary"
        weight="semibold"
      >
        {title?.replace("%user_name%", String(firstName))}
      </Typography>
      <div className="flex gap-4">
        <CoinBalance />
        <Avatar image={photoUrl} />
      </div>
    </div>
  );
};
