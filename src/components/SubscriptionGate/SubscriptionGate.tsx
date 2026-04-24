import { ReactNode, useState } from "react";
import { cn } from "../../utils";

export type SubscriptionTier = "free" | "basic" | "premium" | "enterprise";

export interface SubscriptionConfig {
  [key: string]: {
    requiredTier: SubscriptionTier;
    message: string;
    features?: string[];
    price?: string;
  };
}

interface SubscriptionGateProps {
  children: ReactNode;
  hasAccess: boolean;
  requiredTier?: SubscriptionTier;
  currentTier?: SubscriptionTier;
  mode?: "blur" | "hide" | "disabled" | "overlay";
  blurAmount?: string;
  message?: string;
  showLockIcon?: boolean;
  showOnHover?: boolean;
  customOverlay?: ReactNode;
  className?: string;
  onSubscribe?: () => void;
}

export const SubscriptionGate = ({
  children,
  hasAccess,
  mode = "blur",
  blurAmount = "blur(1px)",
  message = "Доступен по подписке",
  showLockIcon = true,
  showOnHover = true,
  customOverlay,
  className,
}: SubscriptionGateProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (hasAccess) {
    return <>{children}</>;
  }

  if (mode === "hide") {
    return null;
  }

  if (mode === "disabled") {
    return (
      <div className={cn("relative", className)}>
        <div
          style={{ pointerEvents: "none", opacity: 0.3, /* filter:'blur(1px)' */}}
          className="select-none"
        >
          {children}
        </div>
        <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1 backdrop-blur-sm">
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
      </div>
    );
  }

  return (
    <div
      className={cn("relative group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="transition-all duration-300"
        style={{
          filter: blurAmount,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {children}
      </div>

      <div className="absolute inset-0 bg-black/30 rounded-inherit" />

      {showLockIcon && (
        <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1 backdrop-blur-sm">
          <svg
            className="w-3.5 h-3.5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
      )}

      {showOnHover && isHovered && (
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-200">
          {customOverlay || (
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 mx-4 text-center shadow-xl transform transition-transform group-hover:scale-105">
              <svg
                className="w-8 h-8 text-brown-primary mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-brown-primary font-medium text-sm">
                {message}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
