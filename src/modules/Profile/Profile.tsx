import { Avatar } from "../../components/Avatar";
import { Typography } from "../../components/Typography";
import { useLaunchParamsTelegram } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { version } from "../../../package.json";
import { menuSections, TProfileSection } from "./Profile.constants";
import { ROUTES } from "../../containers";

export const Profile = () => {
  const navigate = useNavigate();
  const { firstName, photoUrl } = useLaunchParamsTelegram();

  const handleMenuItemClick = (item: TProfileSection["items"][0]) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.route) {
      navigate(item.route);
    } else if (item.external) {
      window.open(item.external, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div>
      <div className="p-2 mb-2">
        <div className="flex flex-col items-center gap-4">
          <Avatar
            image={photoUrl}
            size={90}
            onClick={() => navigate(ROUTES.PROFILE)}
          />
          <div className="text-center">
            <Typography type="heading-lg" className="text-brown-primary mb-1">
              {firstName}
            </Typography>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {menuSections.map((section, idx) => (
          <div
            key={idx}
            className="bg-white-primary rounded-2xl overflow-hidden"
          >
            {section.title && (
              <div className="px-4 pt-4 pb-1">
                <Typography
                  type="body-s"
                  className="text-brown-secondary font-medium"
                >
                  {section.title}
                </Typography>
              </div>
            )}

            <div className="divide-y divide-gray-100">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuItemClick(item)}
                  className="w-full flex items-center justify-between px-4 py-4"
                >
                  <div className="flex items-center gap-3">
                    {item.icon && (
                      <span className="text-xl w-6 text-center">
                        {item.icon}
                      </span>
                    )}
                    <Typography type="body-md" className="text-brown-primary">
                      {item.label}
                    </Typography>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.external && (
                      <span className="text-xs text-brown-secondary">↗</span>
                    )}
                    <svg
                      className="w-4 h-4 text-brown-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-6 text-center">
        <Typography type="body-s" className="text-brown-secondary">
          Версия {version}
        </Typography>
        <Typography type="body-xs" className="text-brown-secondary mt-1">
          © 2026 Haven
        </Typography>
      </div>
    </div>
  );
};
