import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import {
  CalendarDate,
  CalendarDateTime,
  ZonedDateTime,
  Time,
} from "@internationalized/date";

export const formatDateRange = (startDate: string, endDate: string) => {
  const start = typeof startDate === "string" ? parseISO(startDate) : startDate;
  const end = typeof endDate === "string" ? parseISO(endDate) : endDate;

  const startFormatted = format(start, "d MMM", { locale: ru });
  const endFormatted = format(end, "d MMM", { locale: ru });

  return `${startFormatted} — ${endFormatted}`;
};

export const getDateFromInternationalized = () => {
  return {
    getYYYYDDMM: (date?: CalendarDate | CalendarDateTime | ZonedDateTime) => {
      if (!date) return '';
      const year = date.year.toString().padStart(4, "0");
      const month = date.month.toString().padStart(2, "0");
      const day = date.day.toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    getTime: (time?: Time) => {
      if (!time) return undefined;

      const hour = time.hour.toString().padStart(2, "0");
      const minute = time.minute.toString().padStart(2, "0");
      return `${hour}:${minute}`;
    },
  };
};
