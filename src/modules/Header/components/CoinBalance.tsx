import { Icon } from "../../../components/Icon";
import { SkeletonComponent } from "../../../components/Skeleton";
import { Typography } from "../../../components/Typography";
import { useGetCoin } from "../../../hooks";

export const CoinBalance = () => {
  const { data, isLoading } = useGetCoin();

  return (
    <div className="bg-white-tertiary rounded-full py-2 px-4 flex justify-center items-center gap-2">
      <Icon name="ZenFilled" width={18} height={18} className="fill-(--stroke-beige-primary)"/>
      {isLoading ? (
        <SkeletonComponent className="h-4 w-4" />
      ) : (
        <Typography type="body-s" className="text-beige-primary">
          {data?.total}
        </Typography>
      )}
    </div>
  );
};
