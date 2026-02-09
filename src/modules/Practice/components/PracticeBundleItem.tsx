import { TPractice } from "../../../api";
import { Icon } from "../../../components/Icon";
import { Typography } from "../../../components/Typography";
import { Drawer, useDrawer } from "../../../components/Drawer";
import { Button } from "@heroui/button";
import { useCallback } from "react";
import { Chip } from "../../../components/Chip";
import { useGetPracticeInstructions } from "../../../hooks";

type Props = {
  item: TPractice;
};
export const PracticeBundleItem = ({ item }: Props) => {
  const { title, description, priceZen, isPurchased, id } = item;

  const drawer = useDrawer();

  const handleCardClick = useCallback(() => {
    drawer.open();
  }, [drawer]);

  const { data } = useGetPracticeInstructions(id, isPurchased && drawer.isOpen);

  return (
    <div
      className="p-4 bg-beige-tertiary rounded-2xl flex justify-between items-center"
      onClick={handleCardClick}
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
      <Drawer
        title={title}
        open={drawer.isOpen}
        onClose={drawer.close}
        isNasted
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
