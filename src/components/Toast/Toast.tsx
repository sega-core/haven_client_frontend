import { addToast } from "@heroui/toast";
import cn from "../../utils/cn";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

export const havenToast = {
  coins: (amount: number, reason?:string, description?: string) => {
    addToast({
      title: (
        <Typography type="body-md" className="flex gap-1 items-center">
          Вам начислено {amount}{" "}
          <Icon name="ZenFilled" className="fill-(--stroke-white-primary)" />
          {" "}{reason}
        </Typography>
      ),
      description: (
        <Typography type="body-s" className="text-white-primary">
          {description || "Баланс обновлен"}
        </Typography>
      ),
      radius: "lg",
      timeout: 5000,
      hideIcon: true,
      classNames: {
        base: cn(
          "mt-20",
          "py-4 px-5 rounded-[16px]",
          "bg-cold-green-primary",
          "border border-[var(--background-color-2-primary)] ",
          "backdrop-blur-sm shadow-lg",
        ),
        title: "text-white-primary",
        description: "text-white-primary",
      },
    });
  },
};
