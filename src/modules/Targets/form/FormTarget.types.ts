import { CalendarDate, Time } from "@internationalized/date";

export enum ETargetField {
  TITLE = "TITLE",
  DATE = "DATE",
  NOTIFICATION_TIME = "NOTIFICATION_TIME",
  WEEKDAYS = "WEEKDAYS",
  COLOR = "COLOR",
}

export enum ETargetColor {
  COLOR1 = "bg-mustard-primary",
  COLOR2 = "bg-vinous-primary",
  COLOR3 = "bg-cold-green-primary",
  COLOR4 = "bg-flesh-primary",
  COLOR5 = "bg-light-green-primary",
}

export enum ENameDay {
  MON = "mon",
  TUE = "tue",
  WED = "wed",
  THU = "thu",
  FRI = "fri",
  SAT = "sat",
  SUN = "sun",
}

export type TWeekdays = {
  [ENameDay.MON]: boolean;
  [ENameDay.TUE]: boolean;
  [ENameDay.WED]: boolean;
  [ENameDay.THU]: boolean;
  [ENameDay.FRI]: boolean;
  [ENameDay.SAT]: boolean;
  [ENameDay.SUN]: boolean;
};

export type TPartialWeekdays = Partial<TWeekdays>;

export type TTargetForm = {
  [ETargetField.TITLE]: string;
  [ETargetField.DATE]?: { start: CalendarDate; end: CalendarDate };
  [ETargetField.NOTIFICATION_TIME]?: Time;
  [ETargetField.WEEKDAYS]?: TPartialWeekdays;
  [ETargetField.COLOR]: ETargetColor;
};
