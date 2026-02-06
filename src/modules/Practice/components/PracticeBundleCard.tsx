import { useNavigate } from "react-router";
import { TPraciteBundle } from "../../../api";
import { Chip } from "../../../components/Chip";
import { Icon } from "../../../components/Icon";
import { Typography } from "../../../components/Typography";
import { ROUTES } from "../../../containers";
import cn from "../../../utils/cn";

type Props = {
  item: TPraciteBundle;
};
export const PracticeBundleCard = ({ item }: Props) => {
  const { priceRubWithDiscount, isPurchasedBundle, title, tags, id } = item;

  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(ROUTES.PRACTICE_ID.replace(":id", String(id)));
  };

  return (
    <div
      className={cn(
        "p-4 rounded-3xl flex flex-col justify-between bg-black-secondary gap-2 min-h-[179px] relative",
      )}
      onClick={goToDetail}
    >
      <div className="flex gap-2 justify-end z-10">
        {priceRubWithDiscount && !isPurchasedBundle && (
          <Chip color="mustard" label={`${priceRubWithDiscount}₽`} />
        )}
        {isPurchasedBundle && (
          <Chip color="mustard" label='Куплено' />
        )}
      </div>
      <div className="grid gap-2 z-10">
        <Typography
          type="heading-xs"
          className="text-white-primary flex items-center gap-2"
        >
          {title}{" "}
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
    </div>
  );
};
