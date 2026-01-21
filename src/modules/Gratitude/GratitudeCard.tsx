import { useCallback, useState } from "react";
import { Block } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { Typography } from "../../components/Typography";
import { GratitudeSheet } from "./GratitudeSheet";
import { useGetGratitude } from "../../hooks";
import { Chip } from "../../components/Chip";
import { getTime } from "../../utils";

export const GratitudeCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  const { data } = useGetGratitude();

  const renderChips = useCallback(
    () =>
      data?.map((item) => (
        <Chip
          label={getTime(item.createdAt)}
          key={item.id}
        />
      )),
    [data]
  );

  return (
    <Block onClick={onOpen}>
      <div className="flex justify-between items-center">
        <Typography className="text-brown-primary" type="heading-xs">
          Благодарность
        </Typography>
        <Icon name="ChevronRight" width={24} height={24} />
      </div>
      {!data?.length && (
        <Typography className="text-brown-primary" type="body-s">
          Фокус на приятных мелочах помогает бороться с тревогой и
          беспокойством.
        </Typography>
      )}
      {!!data?.length && (
        <div className="flex gap-3 flex-wrap">{renderChips()}</div>
      )}
      <GratitudeSheet
        isOpen={isOpen}
        onClose={onClose}
        gratitudes={data || []}
      />
    </Block>
  );
};
