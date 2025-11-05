import { TPractice } from "../../api";
import { Chip } from "../../components/Chip";
import { Typography } from "../../components/Typography";
import cn from "../../utils/cn";
import { useGetPracticeInstructions, useSpendCoin } from "../../hooks";
import { PriceChip } from "./components/PriceChip";
import { PurchaseDrawer } from "./components/PurchaseDrawer";
import { useDrawerContext } from "../../components/Drawer/DrawerContextProvider";
import { Icon } from "../../components/Icon";

type Props = {
  item: TPractice;
  hidePurchasedChip?: boolean;
  isNasted?: boolean;
};
export const PracticeCard = ({ item, hidePurchasedChip, isNasted }: Props) => {
  const { priceZen, title, tags, isPurchased, description, id } = item;

  const { openDrawer, closeDrawer } = useDrawerContext();

  const { data } = useGetPracticeInstructions(id, isPurchased);

  const { mutateAsync } = useSpendCoin();

  const handlePay = async () => {
    await mutateAsync({
      amount: priceZen,
      practiceId: id,
    });
    closeDrawer();
  };

  const onClickCard = () => {
    openDrawer({
      title,
      isNasted,
      content: (
        <div className="flex flex-col gap-4">
          <PurchaseDrawer
            title={title}
            description={description}
            instructions={data?.instructions}
            isPurchased={isPurchased}
            price={priceZen}
            currency="zen"
            handlePay={handlePay}
          />
        </div>
      ),
    });
  };

  if (isNasted) {
    return (
      <div
        className="p-4 bg-beige-tertiary rounded-2xl flex justify-between items-center"
        onClick={onClickCard}
      >
        <Typography type="body-s" className="text-brown-primary">
          {title}
        </Typography>
        {!isPurchased && (
          <Chip
            icon={<Icon name="ZenFilled" width={14} height={14} />}
            color="beige"
            iconPostition="end"
            label={String(priceZen)}
          />
        )}
        {isPurchased && <Chip color="beige" label="Куплено" />}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "p-4 rounded-3xl flex flex-col justify-between bg-black-secondary gap-2 h-[179px]",
        "active:scale-95 transition-transform duration-150",
      )}
      onClick={onClickCard}
    >
      <PriceChip
        price={priceZen}
        isPurchased={isPurchased}
        hidePurchasedChip={hidePurchasedChip}
        type="practice"
      />
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
