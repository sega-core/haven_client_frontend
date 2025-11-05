import { useCallback } from "react";
import { Block } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { Typography } from "../../components/Typography";
import { GratitudeSheet } from "./GratitudeSheet";
import { Chip } from "../../components/Chip";
import { getTime } from "../../utils";
import { TGratitude } from "../../api";
import { useDrawerContext } from "../../components/Drawer";

type Props = {
  data?: TGratitude[];
};

export const GratitudeCard = ({ data }: Props) => {
  const { openDrawer, closeDrawer } = useDrawerContext();

  const handleOpenGratitudeSheet = useCallback(() => {
    openDrawer({
      title: "Трекер благодарности",
      content: <GratitudeSheet onClose={closeDrawer} gratitudes={data || []} />,
    });
  }, [openDrawer, closeDrawer]);

  const renderChips = useCallback(
    () =>
      data?.map((item) => (
        <Chip label={getTime(item.createdAt)} key={item.id} />
      )),
    [data],
  );

  return (
    <Block onClick={handleOpenGratitudeSheet} className="shadow-lg">
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
    </Block>
  );
};
