import { TPraciteBundle } from "../../../api";
import { Chip } from "../../../components/Chip";
import { Typography } from "../../../components/Typography";
import cn from "../../../utils/cn";
import { Drawer, useDrawer } from "../../../components/Drawer";
import { Button } from "@heroui/button";
import { useCallback } from "react";
import { PracticeBundleItem } from "./PracticeBundleItem";

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

  const drawer = useDrawer();

  const handleCardClick = useCallback(() => {
    drawer.open();
  }, [drawer]);

  const price = isApplyDiscount ? priceRubWithDiscount : priceRub;

  //TODO: сделать перечеркнуто при скидке

  return (
    <div
      className={cn(
        "p-4 rounded-3xl flex flex-col justify-between bg-black-secondary gap-2 min-h-[179px]",
        "active:scale-95 transition-transform duration-150",
      )}
      onClick={handleCardClick}
    >
      <div className="flex gap-2 justify-end z-10">
        {!isPurchasedBundle && <Chip color="mustard" label={`${price}₽`} />}
        {isPurchasedBundle && <Chip color="mustard" label="Куплено" />}
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
              {description}
            </Typography>
            <Typography type="body-md" className="text-brown-primary">
              Практики
            </Typography>
            {practiceBundleItems.map((item, index) => (
              <PracticeBundleItem item={item.practice} key={index} />
            ))}
            <Button
              radius="full"
              className="bg-beige-primary text-white"
              type="submit"
            >
              Купить за {priceRubWithDiscount}₽
            </Button>
          </div>
        }
      />
    </div>
  );
};
