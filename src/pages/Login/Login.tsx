import { useAuth } from "../../hooks";
import { useEffect } from "react";
import HavenLogo from "../../assets/images/havenLogo.jpg";

export const Login = () => {
  const { mutate } = useAuth();

  useEffect(() => {
    mutate();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
      <div className="max-w-lg w-full">
        <div className={"relative flex justify-center"}>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-[180px] h-[180px] animate-spin"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeDasharray="70 200"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="100%" stopColor="#b6875a" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <img
            src={HavenLogo}
            alt="HavenLogo"
            width={160}
            height={160}
            className="rounded-full relative z-10"
          />
        </div>
      </div>
    </div>
  );
};
