export enum EMoodField {
  LEVEL = "level",
  TAGS = "tags",
  COMMENT = "comment",
}

export type TMoodForm = {
  [EMoodField.LEVEL]?: number;
  [EMoodField.TAGS]?: string[];
  [EMoodField.COMMENT]?: string;
};
