export enum EMetaCardField {
  SEEN = "seen",
  FELT = "felt",
  UNDERSTOOD = "understood",
}

export type TMetaCardForm = {
  [EMetaCardField.SEEN]: string;
  [EMetaCardField.FELT]: string;
  [EMetaCardField.UNDERSTOOD]: string;
};
