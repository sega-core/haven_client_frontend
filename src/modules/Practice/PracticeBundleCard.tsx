import { TPraciteBundle } from "../../api";
import { Chip } from "../../components/Chip";
import { Typography } from "../../components/Typography";
import cn from "../../utils/cn";
import { PriceChip } from "./components/PriceChip";
import { useDrawerContext } from "../../components/Drawer/DrawerContextProvider";
import { PurchaseDrawer } from "./components/PurchaseDrawer";
import { PracticeCard } from "./PracticeCard";

type Props = {
  item: TPraciteBundle;
};
export const PracticeBundleCard = ({ item }: Props) => {
  const {
    priceRubWithDiscount,
    isPurchasedBundle,
    title,
    tags,
    practiceBundleItems,
    description,
    isApplyDiscount,
    priceRub,
  } = item;

  const price = isApplyDiscount ? priceRubWithDiscount : priceRub;

  //TODO: сделать перечеркнуто при скидке

  const { openDrawer } = useDrawerContext();

  const handlePay = async () => {
    alert("Переходим к оплате");
  };

  const onClickCard = () => {
    openDrawer({
      title,
      content: (
        <div className="flex flex-col gap-4">
          <PurchaseDrawer
            title={title}
            description={
              <div className="flex flex-col gap-4">
                <Typography type="body-s" className="text-brown-primary">
                  {description}
                </Typography>
                <Typography type="body-md" className="text-brown-primary">
                  Практики
                </Typography>
                {practiceBundleItems.map((item, index) => (
                  <PracticeCard item={item.practice} key={index} isNasted/>
                ))}
              </div>
            }
            isPurchased={isPurchasedBundle}
            price={priceRub}
            currency="rub"
            handlePay={handlePay}
          />
        </div>
      ),
    });
  };

  return (
    <div
      className={cn(
        "p-4 rounded-3xl flex flex-col justify-between bg-black-secondary gap-2 min-h-[179px]",
        "active:scale-95 transition-transform duration-150",
      )}
      onClick={onClickCard}
    >
      <PriceChip type="bundle" price={price} isPurchased={isPurchasedBundle} />
      <div className="grid gap-2 z-10">
        <Typography
          type="heading-xs"
          className="text-white-primary flex items-center gap-2"
        >
          {title}
        </Typography>
        <div className="flex gap-2 flex-wrap">
          {tags?.map((item, index) => (
            <Chip key={index} label={item} color="white" />
          ))}
        </div>
      </div>
      {/*  {imageUrl && (
        <div
          className={cn(
            "absolute inset-0 rounded-3xl overflow-hidden opacity-50 transition-opacity",
          )}
        >
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {isLocked && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          )}
        </div>
      )} */}
    </div>
  );
};
