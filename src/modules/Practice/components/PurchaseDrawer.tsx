import { useEffect, useState } from "react";
import { Typography } from "../../../components/Typography";
import { Button } from "@heroui/button";
import { Icon } from "../../../components/Icon";
import { ConfirmPayStage } from "./ConfirmPayStage";
import { useDrawerContext } from "../../../components/Drawer/DrawerContextProvider";
import { PaymentMethodStage } from "./PaymentMethodStage";

type PurchaseStage = "initial" | "confirmation" | "paymentMethod";
export type TCurrency = "rub" | "zen";

interface PurchaseDrawerProps {
  title: string;
  description: string | React.ReactNode; //TODO: fix types
  isDescriptionNode: boolean;
  instructions?: string;
  isPurchased: boolean;
  priceZen?: number;
  priceRub?: number;
  handlePay: (currency: TCurrency) => void;
}

export const PurchaseDrawer = ({
  title,
  description,
  instructions,
  isDescriptionNode,
  isPurchased,
  priceZen,
  priceRub,
  handlePay,
}: PurchaseDrawerProps) => {
  const [stage, setStage] = useState<PurchaseStage>("initial");
  const [isProcessing, setIsProcessing] = useState(false);

  const hasZen = !!priceZen && priceZen > 0;
  const hasRub = !!priceRub && priceRub > 0;

  const getDefaultCurrency = (): TCurrency => {
    if (hasZen) return "zen";
    if (hasRub) return "rub";
    return "zen";
  };

  const [selectedCurrency, setSelectedCurrency] =
    useState<TCurrency>(getDefaultCurrency());

  const { updateDrawerTitle } = useDrawerContext();

  const isDoubleCurrency = hasZen && hasRub;

  const defaultCurrency = getDefaultCurrency();
  const defaultPrice = defaultCurrency === "zen" ? priceZen : priceRub;

  const currentPrice = selectedCurrency === "zen" ? priceZen : priceRub;

  const handleBuyClick = () => {
    if (isDoubleCurrency) {
      setStage("paymentMethod");
    } else {
      setStage("confirmation");
    }
  };

  const handleCurrencySelect = (currency: TCurrency) => {
    setSelectedCurrency(currency);
    setStage("confirmation");
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      handlePay(selectedCurrency);
    }, 1000);
  };

  const handleBack = () => {
    if (stage === "paymentMethod") {
      setStage("initial");
    } else if (stage === "confirmation") {
      if (isDoubleCurrency) {
        setStage("paymentMethod");
      } else {
        setStage("initial");
      }
    }
  };

  const getTitleWithBackButton = (text: string) => (
    <div className="flex items-center justify-center relative">
      <Icon
        name="ChevronLeft"
        width={24}
        height={24}
        className="absolute left-0 cursor-pointer"
        onClick={handleBack}
      />
      <span className="text-center">{text}</span>
    </div>
  );

  const titleMap: Record<PurchaseStage, React.ReactNode> = {
    initial: title,
    confirmation: getTitleWithBackButton("Подтверждение покупки"),
    paymentMethod: getTitleWithBackButton("Выберите способ оплаты"),
  };

  const renderContent = () => {
    if (isPurchased) {
      return (
        <Typography type="body-s" className="text-brown-primary">
          {isDescriptionNode ? (
            <>{description}</>
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: instructions || (description as string),
              }}
            />
          )}
        </Typography>
      );
    }

    switch (stage) {
      case "paymentMethod":
        return (
          <PaymentMethodStage
            onSelect={handleCurrencySelect}
            priceZen={priceZen}
            priceRub={priceRub}
          />
        );

      case "confirmation":
        return (
          <ConfirmPayStage
            onClick={handleConfirmPayment}
            amount={currentPrice || 0}
            currency={selectedCurrency}
            isLoading={isProcessing}
          />
        );

      case "initial":
      default:
        return (
          <div className="flex flex-col gap-4">
            <Typography type="body-s" className="text-brown-primary">
              {isDescriptionNode ? (
                <>{description}</>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: description as string,
                  }}
                />
              )}
            </Typography>

            <div className="flex flex-col gap-3">
              <Button
                radius="full"
                className="bg-beige-primary text-white"
                onPress={handleBuyClick}
                endContent={
                  isDoubleCurrency ? null : (
                    <div className="flex items-center gap-1">
                      <Icon
                        name={defaultCurrency === "zen" ? "ZenFilled" : "Rub"}
                        width={14}
                        height={14}
                        className="fill-white"
                      />
                    </div>
                  )
                }
              >
                {isDoubleCurrency
                  ? "Купить"
                  : `Купить за ${defaultPrice}`}
              </Button>
              <Typography
                type="body-xs"
                className="text-brown-primary text-center"
              >
                Доступ к практикам сохраняется, пока вы пользуетесь приложением
              </Typography>
            </div>
          </div>
        );
    }
  };

  useEffect(() => {
    updateDrawerTitle(titleMap[stage]);
  }, [stage, updateDrawerTitle]);

  return <div>{renderContent()}</div>;
};
