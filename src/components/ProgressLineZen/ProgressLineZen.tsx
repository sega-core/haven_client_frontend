import { Button } from "@heroui/button";
import { Icon } from "../Icon";

export const ProgressLineZen = ({ goal }: { goal: number }) => {
  const segments = [0, 1, 2];

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center w-full gap-1">
        {segments.map((i) => {
          const active = goal > i;
          return (
            <div key={i} className="flex items-center w-full gap-1">
              <div
                className={`
                  rounded-2xl 
                  w-full 
                  h-1
                  ${
                    active
                      ? "bg-(--stroke-white-primary)"
                      : "bg-(--stroke-white-secondary)"
                  }
                `}
              />
              <Icon
                name="CheckFilled"
                className={`
                  shrink-0
                  ${
                    active
                      ? "fill-(--stroke-white-primary)"
                      : "fill-(--stroke-white-secondary)"
                  }
                `}
                width={20}
                height={20}
              />
            </div>
          );
        })}
      </div>
      <Button
        isIconOnly
        onPress={() => alert("dasd")}
        variant="light"
        size="sm"
        radius="full"
      >
        <Icon
          name="Info"
          width={20}
          height={20}
          className="fill-(--stroke-white-primary)"
        />
      </Button>
    </div>
  );
};
