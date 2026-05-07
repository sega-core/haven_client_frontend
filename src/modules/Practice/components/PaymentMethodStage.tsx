import { Button } from "@heroui/button";
import { Typography } from "../../../components/Typography";
import { Icon } from "../../../components/Icon";
import { cn } from "../../../utils/cn";
import { useState } from "react";
import { TCurrency } from "./PurchaseDrawer";

interface PaymentMethodStageProps {
  onSelect?: (currency: TCurrency) => void;
  priceRub?: number;
  priceZen?: number;
}

interface PaymentOptionCardProps {
  currency: TCurrency;
  price: number;
  iconName: "ZenFilled" | "Rub";
  iconSize: number;
  title: string;
  isSelected: boolean;
  onSelect: () => void;
}

const PaymentOptionCard = ({
  price,
  iconName,
  iconSize,
  title,
  isSelected,
  onSelect,
}: PaymentOptionCardProps) => (
  <div
    onClick={onSelect}
    className={cn(
      "flex-1 bg-beige-tertiary flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all",
      isSelected
        ? "border-[#b6875a] border-2"
        : "border-[#b6875a33] border-2 hover:border-[#b6875a80]"
    )}
  >
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-beige-primary">
        <Icon
          name={iconName}
          width={iconSize}
          height={iconSize}
          className="fill-(--stroke-white-primary)"
        />
      </div>
      <div className="text-left">
        <Typography
          type="body-md"
          weight="semibold"
          className="text-beige-primary"
        >
          {price}
        </Typography>
        <Typography type="body-xs" className="text-brown-primary">
          {title}
        </Typography>
      </div>
    </div>
  </div>
);

export const PaymentMethodStage = ({
  onSelect,
  priceRub = 0,
  priceZen = 0,
}: PaymentMethodStageProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState<TCurrency>("zen");

  const handleSelect = (currency: TCurrency) => {
    setSelectedCurrency(currency);
  };

  const handleContinue = () => {
    onSelect?.(selectedCurrency);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        <PaymentOptionCard
          currency="zen"
          price={priceZen}
          iconName="ZenFilled"
          iconSize={20}
          title="Zen"
          isSelected={selectedCurrency === "zen"}
          onSelect={() => handleSelect("zen")}
        />
        <PaymentOptionCard
          currency="rub"
          price={priceRub}
          iconName="Rub"
          iconSize={16}
          title="Рубли"
          isSelected={selectedCurrency === "rub"}
          onSelect={() => handleSelect("rub")}
        />
      </div>

      <Button
        radius="full"
        className="bg-beige-primary text-white"
        onPress={handleContinue}
      >
        Продолжить
      </Button>
    </div>
  );
};