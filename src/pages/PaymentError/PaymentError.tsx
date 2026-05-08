import { Block } from "../../components/Block";
import { Typography } from "../../components/Typography";

export const PaymentError = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
       <Block
              className="flex items-center justify-center h-screen"
              disabledTranform
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
                  Не удалось оплатить
                </Typography>
              </div>
            </Block>
    </div>
  );
};
