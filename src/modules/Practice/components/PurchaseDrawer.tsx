import { useState } from "react";
import { Typography } from "../../../components/Typography";
import { Button } from "@heroui/button";
import { Icon } from "../../../components/Icon";
import { ConfirmPayStage } from "./ConfirmPayStage";
import { cn } from "../../../utils/cn";
import { useDrawerContext } from "../../../components/Drawer/DrawerContextProvider";

type PurchaseStage = "initial" | "confirmation";

interface PurchaseDrawerProps {
  title: string;
  description: string | React.ReactNode;
  instructions?: string;
  isPurchased: boolean;
  price: number;
  currency: "rub" | "zen";
  handlePay: () => void;
}

export const PurchaseDrawer = ({
  title,
  description,
  instructions,
  isPurchased,
  price,
  currency,
  handlePay,
}: PurchaseDrawerProps) => {
  const [stage, setStage] = useState<PurchaseStage>("initial");
  const [isProcessing, setIsProcessing] = useState(false);

  const { updateDrawerTitle } = useDrawerContext();

  const handleBuyClick = () => {
    setStage("confirmation");
    updateDrawerTitle(titleMap['confirmation']);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setIsProcessing(false);
    handlePay();
  };

  const handleBack = () => {
    setStage("initial");
    updateDrawerTitle(titleMap['initial']);
  };

  const titleMap = {
    initial: title,
    confirmation: (
      <div className="flex items-center justify-center relative">
        <Icon
          name="ChevronLeft"
          width={24}
          height={24}
          className="absolute left-0 cursor-pointer"
          onClick={handleBack}
        />
        <span className="text-center">Подтверждение покупки</span>
      </div>
    ),
  };

  const renderContent = () => {
    if (isPurchased) {
      return (
        <Typography type="body-s" className="text-brown-primary">
          {instructions || description}
        </Typography>
      );
    }

    switch (stage) {
      case "confirmation":
        return (
          <ConfirmPayStage
            onClick={handleConfirmPayment}
            amount={price}
            currency={currency}
            isLoading={isProcessing}
          />
        );

      case "initial":
      default:
        return (
          <div className="flex flex-col gap-4">
            <Typography type="body-s" className="text-brown-primary">
              {description}
            </Typography>

            <div className="flex flex-col gap-3">
              <Button
                radius="full"
                className={cn("bg-beige-primary text-white")}
                onPress={handleBuyClick}
                endContent={
                  <div className="flex items-center gap-1">
                    <Icon
                      name={currency === "zen" ? "ZenFilled" : "Rub"}
                      width={14}
                      height={14}
                      className="fill-(--stroke-white-primary)"
                    />
                  </div>
                }
              >
                Купить за {price}
              </Button>
            </div>
          </div>
        );
    }
  };

  return <div>{renderContent()}</div>;
};
