import { DAYS } from "./DayPanel.constant";

import { CheckboxDay } from "../../fields/CheckboxDay";

export const DayPanel = () => {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {DAYS.map(({ title, id }) => (
        <CheckboxDay key={id} value={id} label={title} />
      ))}
    </div>
  );
};
