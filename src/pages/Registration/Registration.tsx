import { Button } from "@heroui/button";
import { useLayoutEffect, useState } from "react";
import { Typography } from "../../components/Typography";
import HavenLogo from "../../assets/images/havenLogo.jpg";
import { useNavigate } from "react-router";
import { ROUTES } from "../../containers";
import { useRegistration } from "../../hooks";
import { tokenService } from "../../utils";

export const Registration = () => {
  const { accessToken } = tokenService.getJwtToken();

  const [isAccepted, setIsAccepted] = useState(false);

  const { mutateAsync, isPending } = useRegistration();

  const acceptTerms = async () => {
    try {
      mutateAsync();
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (accessToken) {
      navigate(ROUTES.MAIN);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="max-w-lg w-full mx-4 bg-white-primary rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <Typography
            type="heading-md"
            className="text-brown-primary text-center"
          >
            Добро пожаловать в Haven!
          </Typography>
          <Typography
            type="body-lg"
            className="text-brown-primary mt-2 text-center"
          >
            Ваше личное пространство для гармонии и осознанности
          </Typography>
        </div>
        <div className="flex justify-center overflow-hidden">
          <img
            src={HavenLogo}
            alt="HavenLogo"
            width={160}
            height={160}
            className="rounded-full"
          />
        </div>
        <div className="p-6">
          <div className="space-y-3 mb-6">
            <div className="flex gap-3">
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAccepted}
                  onChange={(e) => setIsAccepted(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-cold-green-primary rounded border-beige-tertiary focus:ring-cold-green-primary disabled:opacity-50"
                />
              </label>
              <div>
                <Typography type="body-s" className="text-brown-primary">
                  Я принимаю условия{" "}
                  <span
                    className="font-medium underline"
                    onClick={() => navigate(ROUTES.TERMS)}
                  >
                    Пользовательского соглашения
                  </span>{" "}
                  и{" "}
                  <span
                    className="font-medium underline"
                    onClick={() => navigate(ROUTES.PRIVACY)}
                  >
                    Политики конфиденциальности
                  </span>
                </Typography>
              </div>
            </div>
          </div>
          <Button
            onPress={acceptTerms}
            isDisabled={!isAccepted || isPending}
            isLoading={isPending}
            radius="full"
            className="w-full bg-beige-primary text-white font-medium py-3 disabled:opacity-50"
          >
            {isPending ? "Подождите..." : "Принять и продолжить"}
          </Button>
        </div>
      </div>
    </div>
  );
};
