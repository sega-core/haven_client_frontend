import { Avatar } from "../../components/Avatar";
import { Typography } from "../../components/Typography";
import { useRouteTitle } from "./hooks/useRouteTitle";

export const Header = () => {
  const { title } = useRouteTitle();

  return (
    <div className="flex justify-between w-full">
      <Typography type="heading-md" className="text-brown-primary">
        {title}
      </Typography>
      <div>
        <Avatar />
      </div>
    </div>
  );
};
