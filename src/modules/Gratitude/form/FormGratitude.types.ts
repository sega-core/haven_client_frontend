export enum EGratitudeField {
  COMMENT = "comment",
}

export type TGratitudeForm = {
  [EGratitudeField.COMMENT]: string;
};
