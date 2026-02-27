import { useNavigate } from "react-router";
import { Icon } from "../Icon";
import { ROUTES } from "../../containers";

type TAvatar = {
  image?: string | null;
  name?: string | null;
  size?: number;
};

export const Avatar = ({ image, name, size = 42 }: TAvatar) => {
  const initials = name?.trim()?.charAt(0)?.toUpperCase() ?? null;

  const navigate = useNavigate();

  const goToProfile = () => {
    navigate(ROUTES.PROFILE);
  };

  return (
    <div
      className="flex items-center justify-center rounded-full bg-white-tertiary overflow-hidden select-none"
      style={{ width: size, height: size }}
      onClick={goToProfile}
    >
      {image ? (
        <img
          src={image}
          alt={name ?? "avatar"}
          className="w-full h-full object-cover"
        />
      ) : initials ? (
        <span className="text-base font-medium text-gray-700">{initials}</span>
      ) : (
        <div className="text-gray-400">
          <Icon name="User" />
        </div>
      )}
    </div>
  );
};
