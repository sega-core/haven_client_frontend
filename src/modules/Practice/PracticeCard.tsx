import { TPractice } from "../../api";
import { Chip } from "../../components/Chip";
import { Typography } from "../../components/Typography";
import cn from "../../utils/cn";
import { useGetPracticeInstructions, useCreatePayment } from "../../hooks";
import { PriceChip } from "./components/PriceChip";
import { PurchaseDrawer, TCurrency } from "./components/PurchaseDrawer";
import { useDrawerContext } from "../../components/Drawer/DrawerContextProvider";

type Props = {
  item: TPractice;
  hidePurchasedChip?: boolean;
  isNasted?: boolean;
};
export const PracticeCard = ({ item, hidePurchasedChip, isNasted }: Props) => {
  const {
    priceZen,
    priceRub,
    title,
    tags,
    isPurchased,
    description,
    id,
    imgUrl,
  } = item;

  const { openDrawer, closeDrawer } = useDrawerContext();

  const { data } = useGetPracticeInstructions(id, isPurchased);

  const { mutateAsync: createPayment } = useCreatePayment();

  const handlePay = async (currency: TCurrency) => {
    createPayment({ currency, id, type:'practice' });
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
            handlePay={handlePay}
            isDescriptionNode={false}
            priceZen={priceZen}
            priceRub={priceRub}
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
        <PriceChip isPurchased={isPurchased} priceZen={priceZen} />
      </div>
    );
  }

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
        {!isPurchased ? (
          <div className="flex gap-1 justify-end">
            <PriceChip
              priceZen={priceZen}
              isPurchased={isPurchased}
              hidePurchasedChip={hidePurchasedChip}
            />
            {priceRub && (
              <PriceChip
                priceRub={priceRub}
                isPurchased={isPurchased}
                hidePurchasedChip={hidePurchasedChip}
              />
            )}
          </div>
        ) : (
          <PriceChip
            isPurchased={isPurchased}
            hidePurchasedChip={hidePurchasedChip}
          />
        )}

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
