import { TPraciteBundle, TPractice } from "../../../api";
import { Chip } from "../../../components/Chip";
import { Icon } from "../../../components/Icon";
import { Typography } from "../../../components/Typography";
import cn from "../../../utils/cn";
import { Drawer, useDrawer } from "../../../components/Drawer";
import { Button } from "@heroui/button";
import { useCallback, useState } from "react";

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
  } = item;

  const drawer = useDrawer();

  const [selectedPractice, setSelectedPractice] = useState<TPractice>();

  const handleCardClick = useCallback(() => {
    drawer.openMain();
  }, [drawer]);

  const handlePracticeSelect = useCallback(
    (practice: TPractice) => {
      setSelectedPractice(practice);
      drawer.openNested();
    },
    [drawer],
  );

  return (
    <div
      className={cn(
        "p-4 rounded-3xl flex flex-col justify-between bg-black-secondary gap-2 min-h-[179px]",
        "active:scale-95 transition-transform duration-150",
      )}
      onClick={handleCardClick}
    >
      <div className="flex gap-2 justify-end z-10">
        {priceRubWithDiscount && !isPurchasedBundle && (
          <Chip color="mustard" label={`${priceRubWithDiscount}₽`} />
        )}
        {isPurchasedBundle && <Chip color="mustard" label="Куплено" />}
      </div>
      <div className="grid gap-2 z-10">
        <Typography
          type="heading-xs"
          className="text-white-primary flex items-center gap-2"
        >
          {title}
          {!isPurchasedBundle && (
            <Icon name="LockFilled" className="fill-(--text-white-primary)" />
          )}
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
        drawerMainProps={drawer.drawerProps.main}
        drawerNastedProps={drawer.drawerProps.nested}
        mainContent={
          <div className="flex flex-col gap-4">
            <Typography
              type="heading-xs"
              className="text-center w-full text-brown-primary"
              weight="semibold"
            >
              {title}
            </Typography>
            <Typography type="body-s" className="text-brown-primary">
              {description}
            </Typography>
            <Typography type="body-md" className="text-brown-primary">
              Практики
            </Typography>
            {practiceBundleItems.map((item, index) => (
              <div
                className="p-4 bg-beige-tertiary rounded-2xl flex justify-between"
                key={index}
                onClick={() => {
                  handlePracticeSelect(item.practice);
                }}
              >
                <Typography type="body-s" className="text-brown-primary">
                  {item.practice.title}
                </Typography>
                <Icon name="ChevronRight" />
              </div>
            ))}
            <Button
              radius="full"
              className="bg-beige-primary text-white"
              type="submit"
            >
              Купить набор
            </Button>
          </div>
        }
        nastedContent={
          <div className="flex flex-col gap-4">
            <Typography
              type="heading-xs"
              className="text-center w-full text-brown-primary"
              weight="semibold"
            >
              {selectedPractice?.title}
            </Typography>
            <Typography type="body-s" className="text-brown-primary">
              {selectedPractice?.description}
            </Typography>
          </div>
        }
      />
    </div>
  );
};
