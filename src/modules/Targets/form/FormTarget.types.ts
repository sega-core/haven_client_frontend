export enum ETargetField {
  TITLE = "TITLE",
  START_DATE = "START_DATE",
  END_DATE = "END_DATE",
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
  [ETargetField.START_DATE]?: string;
  [ETargetField.END_DATE]?: string;
  [ETargetField.NOTIFICATION_TIME]?: string;
  [ETargetField.WEEKDAYS]?: TPartialWeekdays;
  [ETargetField.COLOR]: ETargetColor;
};
