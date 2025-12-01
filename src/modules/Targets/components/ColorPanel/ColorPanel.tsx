import { ColorCheckbox } from "../../../../components/ColorCheckbox";
import { COLORS } from "./ColorPanel.constant";

export const ColorPanel = () => {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {COLORS.map(({ value }) => (
        <ColorCheckbox key={value} value={value} />
      ))}
    </div>
  );
};
