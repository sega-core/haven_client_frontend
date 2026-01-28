import { useCallback, useState } from "react";
import { TargetItem } from "../../modules/Targets";
import { TargetSheet } from "../../modules/Targets";
import { Button } from "@heroui/button";
import { Typography } from "../../components/Typography";
import { useGetTarget } from "../../hooks";
import { SkeletonTarget } from "../../components/Skeleton";
import { Icon } from "../../components/Icon";

export const Targets = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  const { data, isLoading } = useGetTarget();

  const renderAddButton = () => {
    if (isLoading) return;
    if (!data?.length)
      return (
          <div className="mt-[60%] w-full flex flex-col items-center gap-4">
            <Typography type="heading-s" className="text-brown-primary">
              Начните создавать свои цели
            </Typography>
            <Button
              onPress={onOpen}
              radius="full"
              className="bg-white-primary text-beige-primary"
            >
              Добавить
            </Button>
          </div>
      );
    if (data.length < 3) {
      return (
        <div className="flex w-full justify-end">
          <Button
            isIconOnly
            onPress={onOpen}
            radius="full"
            className="bg-white-primary text-beige-primary"
          >
            <Icon name="Plus" width={20} height={20} />
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="grid gap-4 w-full">
      <SkeletonTarget isLoading={isLoading}>
        {data?.map((item, index) => (
          <TargetItem {...item} key={index} />
        ))}
      </SkeletonTarget>
      <>{renderAddButton()}</>
      <TargetSheet isOpen={isOpen} onClose={onClose} type={"add"} />
    </div>
  );
};
