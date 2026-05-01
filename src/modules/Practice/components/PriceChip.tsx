import { Chip } from "../../../components/Chip";
import { Icon } from "../../../components/Icon";
import { TCurrency } from "./PurchaseDrawer";

type Props = {
  isPurchased: boolean;
  hidePurchasedChip?: boolean;
  priceZen?: number;
  priceRub?: number;
  defaultCurrency?: TCurrency;
};

export const PriceChip = ({
  isPurchased,
  hidePurchasedChip,
  priceZen,
  priceRub,
  defaultCurrency = "zen",
}: Props) => {
  const hasZen = priceZen !== undefined && priceZen > 0;
  const hasRub = priceRub !== undefined && priceRub > 0;

  const effectiveCurrency =
    hasZen && !hasRub ? "zen" : hasRub && !hasZen ? "rub" : defaultCurrency;

  const currentPrice = effectiveCurrency === "zen" ? priceZen : priceRub;

  const renderPriceChip = () => {
    if (isPurchased) {
      return null;
    }

    if (effectiveCurrency === "zen") {
      return (
        <Chip
          icon={<Icon name="ZenFilled" width={14} height={14} />}
          iconPostition="end"
          color="green"
          label={String(currentPrice)}
        />
      );
    }

    if (effectiveCurrency === "rub") {
      return <Chip color="mustard" label={`${currentPrice} ₽`} />;
    }

    return null;
  };

  return (
    <div className="flex gap-2 justify-end z-10">
      {renderPriceChip()}
      {isPurchased && !hidePurchasedChip && (
        <Chip color={"white"} label="Куплено" />
      )}
    </div>
  );
};
