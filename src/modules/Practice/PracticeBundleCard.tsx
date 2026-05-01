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
    imgUrl,
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
                  <PracticeCard item={item.practice} key={index} isNasted />
                ))}
              </div>
            }
            isPurchased={isPurchasedBundle}
            handlePay={handlePay}
            isDescriptionNode
            priceRub={price}
          />
        </div>
      ),
    });
  };

  return (
    <div
      className={cn(
        "p-4 rounded-3xl flex flex-col justify-between gap-2 min-h-[179px] relative",
        "active:scale-95 transition-transform duration-150",
      )}
      onClick={onClickCard}
      style={{
        backgroundImage: imgUrl ? `url(${imgUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#1a1a1a",
      }}
    >
      <div className="absolute inset-0 bg-black/50 rounded-3xl" />

      <div className="relative z-10 flex flex-col h-full">
        <PriceChip
          priceRub={price}
          isPurchased={isPurchasedBundle}
        />
        <div className="grid gap-2 mt-auto">
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
      </div>
    </div>
  );
};
