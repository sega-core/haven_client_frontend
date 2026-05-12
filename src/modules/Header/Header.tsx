import { Avatar } from "../../components/Avatar";
import { Typography } from "../../components/Typography";
import { EOnboardingTargetId, useLaunchParamsTelegram } from "../../hooks";
import { CoinBalance } from "./components";
import { useRouteTitle } from "./hooks/useRouteTitle";
import { Icon } from "../../components/Icon";
import { useNavigate } from "react-router";
import { ROUTES } from "../../containers";

export const Header = () => {
  const { title, isVisibleHeader, isVisibleBreadcrumb } = useRouteTitle();

  const { firstName, photoUrl } = useLaunchParamsTelegram();

  const navigate = useNavigate();

  if (isVisibleBreadcrumb) {
    return (
      <div
        className="flex justify-between w-full min-h-[42px]"
        onClick={() => navigate(-1)}
      >
        <div className="flex items-center gap-2">
          <Icon name="ChevronLeft" width={24} height={24} />
          <Typography
            type="heading-s"
            className="text-brown-primary"
            weight="semibold"
          >
            {title}
          </Typography>
        </div>
      </div>
    );
  }

  if (!isVisibleHeader) return null;

  return (
    <div className="flex justify-between w-full items-center">
      <Typography
        type="heading-s"
        className="text-brown-primary"
        weight="semibold"
      >
        {title?.replace("%user_name%", String(firstName))}
      </Typography>
      <div className="flex gap-4 items-center">
        <div id={EOnboardingTargetId.COIN}>
          <CoinBalance />
        </div>
        <div id={EOnboardingTargetId.PROFILE}>
          <Avatar image={photoUrl} onClick={() => navigate(ROUTES.PROFILE)} />
        </div>
      </div>
    </div>
  );
};
