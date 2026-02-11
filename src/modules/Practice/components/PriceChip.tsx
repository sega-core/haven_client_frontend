import { Chip } from "../../../components/Chip";
import { Icon } from "../../../components/Icon";

type Props = {
  isPurchased: boolean;
  hidePurchasedChip?: boolean;
  price: number;
  type: "practice" | "bundle";
};

export const PriceChip = ({
  isPurchased,
  hidePurchasedChip,
  price,
  type,
}: Props) => {
  if (type === "practice") {
    return (
      <div className="flex gap-2 justify-end z-10">
        {!isPurchased && (
          <Chip
            icon={<Icon name="ZenFilled" width={14} height={14} />}
            iconPostition="end"
            color="green"
            label={String(price)}
          />
        )}
        {isPurchased && !hidePurchasedChip && (
          <Chip color="green" label="Куплено" />
        )}
      </div>
    );
  }
  if (type === "bundle") {
    return (
      <div className="flex gap-2 justify-end z-10">
        {!isPurchased && <Chip color="mustard" label={`${price}₽`} />}
        {isPurchased && <Chip color="mustard" label="Куплено" />}
      </div>
    );
  }
};
