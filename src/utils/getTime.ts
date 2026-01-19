import { format } from "date-fns";

export const getTime = (createdAt: string) => {
  const date = new Date(createdAt);
  return format(date, "HH:mm");
};
