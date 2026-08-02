import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { openLink } from "@tma.js/sdk-react";
import { Typography } from "../../components/Typography";
import { Block } from "../../components/Block";
import { useGetPayment } from "../../hooks";
import { ROUTES } from "../../containers";

export const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const url = location.state?.url;
  const invId = location.state?.invId;

  const [status, setStatus] = useState<
    "redirecting" | "checking" | "success" | "error"
  >("redirecting");

  const { mutateAsync } = useGetPayment();

  const checkPaymentStatus = async () => {
    try {
      const data = await mutateAsync(invId);

      if (data.status === "paid") {
        setStatus("success");
        setTimeout(() => {
          navigate(ROUTES.PRACTICE);
        }, 1500);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Check payment error:", error);
      return false;
    }
  };

  useEffect(() => {
    let attempts = 0;
    const MAX_ATTEMPTS = 5;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    let interval: NodeJS.Timeout | null = null;

    if (!url) {
      setStatus("error");
      return;
    }

    openLink(url);

    const redirectTimer = setTimeout(() => {
      setStatus("checking");

      interval = setInterval(async () => {
        attempts++;

        const isPaid = await checkPaymentStatus();

        if (isPaid || attempts >= MAX_ATTEMPTS) {
          if (interval) clearInterval(interval);
        }
      }, 5000);
    }, 3000);

    return () => {
      clearTimeout(redirectTimer);
      if (interval) clearInterval(interval);
    };
  }, [url, invId]);

  if (status === "error") {
    return (
      <Block
        className="flex items-center justify-center h-screen"
        disabledTransform
      >
        <div className="text-center px-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <Typography type="body-md" className="text-brown-primary">
            Ошибка
          </Typography>
          <Typography type="body-s" className="text-brown-secondary mt-2">
            Ссылка на оплату не найдена
          </Typography>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-6 py-2 bg-[#b6875a] text-white rounded-lg"
          >
            Вернуться
          </button>
        </div>
      </Block>
    );
  }

  if (status === "success") {
    return (
      <Block
        className="flex items-center justify-center h-screen"
        disabledTransform
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-cold-green-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <Typography type="body-md" className="text-green-primary">
            Оплата подтверждена!
          </Typography>
          <Typography type="body-s" className="text-green-secondary mt-2">
            Спасибо за покупку
          </Typography>
        </div>
      </Block>
    );
  }

  return (
    <Block
      className="flex items-center justify-center h-screen"
      disabledTransform
    >
      <div className="text-center px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b6875a] mx-auto mb-4"></div>

        {status === "redirecting" && (
          <>
            <Typography type="body-md" className="text-brown-primary">
              Перенаправление на страницу оплаты...
            </Typography>
          </>
        )}

        {status === "checking" && (
          <>
            <Typography type="body-md" className="text-brown-primary">
              Проверяем ваш платеж...
            </Typography>
            <Typography type="body-s" className="text-brown-secondary mt-2">
              Пожалуйста, подождите
            </Typography>
          </>
        )}
      </div>
    </Block>
  );
};
