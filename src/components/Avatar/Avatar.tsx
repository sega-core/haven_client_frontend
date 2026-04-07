import { useNavigate } from "react-router";
import { useState } from "react";
import { Icon } from "../Icon";
import { ROUTES } from "../../containers";

type TAvatar = {
  image?: string | null;
  size?: number;
  disableLoading?: boolean;
};

export const Avatar = ({ image, size = 42, disableLoading = false }: TAvatar) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(!disableLoading);

  const navigate = useNavigate();

  const goToProfile = () => {
    navigate(ROUTES.PROFILE);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const showIcon = !image || imageError;

  return (
    <div
      className="flex items-center justify-center rounded-full bg-white-tertiary overflow-hidden select-none cursor-pointer relative"
      style={{ width: size, height: size }}
      onClick={goToProfile}
    >
      {!showIcon && (
        <>
          {isLoading && !disableLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white-tertiary">
              <div className="w-1/3 h-1/3 rounded-full border-2 border-gray-300 border-t-gray-600 animate-spin" />
            </div>
          )}
          <img
            src={image}
            alt={"avatar"}
            className={`w-full h-full object-cover transition-opacity duration-200 ${
              isLoading && !disableLoading ? "opacity-0" : "opacity-100"
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        </>
      )}
      {(showIcon || (!isLoading && !image)) && (
        <div className="text-gray-400">
          <Icon name="User" />
        </div>
      )}
    </div>
  );
};
