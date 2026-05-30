import { useState } from "react";
import { Icon } from "../Icon";

type TAvatar = {
  image?: string | null;
  size?: number;
  disableLoading?: boolean;
  onClick?: () => void;
};

export const Avatar = ({
  image,
  size = 42,
  disableLoading = false,
  onClick,
}: TAvatar) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      onClick={() => onClick?.()}
    >
      {image && !imageError && (
        <img
          src={image}
          alt="avatar"
          className={`w-full h-full object-cover transition-opacity duration-200 ${
            isLoading && !disableLoading ? "opacity-0" : "opacity-100"
          }`}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      )}
      
      {showIcon && (
        <div className="text-gray-400">
          <Icon name="User" />
        </div>
      )}
    </div>
  );
};