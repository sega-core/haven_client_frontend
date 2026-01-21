export enum EMoodField {
  LEVEL = "LEVEL",
  TAGS = "TAGS",
  COMMENT = "COMMENT",
}

export type TMoodForm = {
  [EMoodField.LEVEL]?: number;
  [EMoodField.TAGS]?: string[];
  [EMoodField.COMMENT]?: string;
};
