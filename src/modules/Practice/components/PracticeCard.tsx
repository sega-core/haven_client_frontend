import { TPractice } from "../../../api";
import { Chip } from "../../../components/Chip";
import { Icon } from "../../../components/Icon";
import { Typography } from "../../../components/Typography";
import cn from "../../../utils/cn";
import { Drawer, useDrawer } from "../../../components/Drawer";
import { Button } from "@heroui/button";
import { useGetPracticeInstructions, useSpendCoin } from "../../../hooks";

type Props = {
  item: TPractice;
  hidePurchasedChip?: boolean;
};
export const PracticeCard = ({ item, hidePurchasedChip }: Props) => {
  const { priceZen, title, tags, isPurchased, description, id } = item;

  const drawer = useDrawer();

  const { data } = useGetPracticeInstructions(id, isPurchased && drawer.isOpen);

  const { mutate } = useSpendCoin();

  return (
    <div
      className={cn(
        "p-4 rounded-3xl flex flex-col justify-between bg-black-secondary gap-2 h-[179px]",
        "active:scale-95 transition-transform duration-150",
      )}
      onClick={() => drawer.open()}
    >
      <div className="flex gap-2 justify-end z-10">
        {!isPurchased && (
          <Chip
            icon={<Icon name="ZenFilled" width={14} height={14} />}
            iconPostition="end"
            color="green"
            label={String(priceZen)}
          />
        )}
        {isPurchased && !hidePurchasedChip && (
          <Chip color="green" label="Куплено" />
        )}
      </div>
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
      <Drawer
        title={title}
        open={drawer.isOpen}
        onClose={drawer.close}
        children={
          <div className="flex flex-col gap-4">
            <Typography type="body-s" className="text-brown-primary">
              {!isPurchased ? description : data?.instructions}
            </Typography>
            {!isPurchased && (
              <Button
                radius="full"
                className="bg-beige-primary text-white"
                type="submit"
                onPress={() => {
                  mutate({
                    amount: priceZen,
                    practiceId: id
                  });
                }}
              >
                Купить за {priceZen}
                <Icon
                  name="ZenFilled"
                  width={14}
                  height={14}
                  className="fill-(--stroke-white-primary)"
                />
              </Button>
            )}
          </div>
        }
      />
    </div>
  );
};
