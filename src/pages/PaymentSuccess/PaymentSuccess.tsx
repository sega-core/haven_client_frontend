import { Block } from "../../components/Block";
import { Typography } from "../../components/Typography";

export const PaymentSuccess = () => {
  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
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
              Спасибо за покупку, возвращайтесь в Haven
            </Typography>
          </div>
        </Block>
      </div>
  );
};
