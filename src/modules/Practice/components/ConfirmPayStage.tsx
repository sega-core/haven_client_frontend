import { Button } from "@heroui/button";
import { Typography } from "../../../components/Typography";
import { Icon } from "../../../components/Icon";
import { cn } from "../../../utils/cn";
import { useGetCoinState } from "../../../hooks";

type Currency = "zen" | "rub";

interface ConfirmPayStageProps {
  onClick: () => void;
  amount?: number;
  currency?: Currency;
  className?: string;
  isLoading?: boolean;
}

const CURRENCY_CONFIG: Record<Currency, { icon: string; label: string }> = {
  zen: {
    icon: "ZenFilled",
    label: "ZEN",
  },
  rub: {
    icon: "Rub",
    label: "₽",
  },
};

const BalanceRow = ({
  label,
  value,
  currency = "zen",
  isTotal = false,
}: {
  label: string;
  value: number;
  currency?: Currency;
  isTotal?: boolean;
}) => {
  const config = CURRENCY_CONFIG[currency];
  const TypographyComponent = isTotal ? "heading-s" : "body-md";

  return (
    <div className="flex items-center justify-between">
      <Typography
        type={TypographyComponent}
        className={cn("text-brown-primary", isTotal && "font-semibold")}
      >
        {label}
      </Typography>
      <div className="flex items-center gap-1">
        <Typography
          type={isTotal ? "heading-s" : "heading-xs"}
          className={cn("text-brown-primary", isTotal && "font-semibold")}
        >
          {value}
        </Typography>
        {currency === "zen" && (
          <Icon
            name={"ZenFilled"}
            width={14}
            height={14}
            className="fill-(--stroke-beige-primary)"
            aria-label={config.label}
          />
        )}
        {currency === "rub" && (
          <Typography
            type={isTotal ? "heading-s" : "heading-xs"}
            className={cn("text-brown-primary", isTotal && "font-semibold")}
          >
            {config.label}
          </Typography>
        )}
      </div>
    </div>
  );
};

export const ConfirmPayStage = ({
  onClick,
  amount = 0,
  currency = "zen",
  className,
  isLoading = false,
}: ConfirmPayStageProps) => {
  const { balance } = useGetCoinState();

  const hasSufficientBalance = balance >= amount;

  const buttonText =
    currency === "rub"
      ? "Перейти к оплате"
      : hasSufficientBalance
        ? "Подтвердить покупку"
        : "Недостаточно средств";

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {currency === "zen" && (
        <BalanceRow label="Баланс:" value={balance} currency={currency} />
      )}
      <BalanceRow
        label="К оплате:"
        value={amount}
        currency={currency}
        isTotal
      />
      <Button
        radius="full"
        className={cn(
          "bg-beige-primary text-white",
          !hasSufficientBalance && "opacity-50 cursor-not-allowed",
        )}
        type="submit"
        onPress={hasSufficientBalance ? onClick : undefined}
        isDisabled={!hasSufficientBalance}
        isLoading={isLoading}
      >
        {buttonText}
      </Button>
    </div>
  );
};
