import { SVGProps } from "react";
import { ICON_MAP } from "./Icon.constants";
import { TIcon } from "./Icon.types";

type TProps = {
  name: TIcon;
  className?: string;
} & SVGProps<SVGSVGElement>;

export const Icon = ({ name, ...props }: TProps) => {
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in ICON_MAP`);
    return <span>Icon not found</span>;
  }

  return <IconComponent {...props} />;
};
