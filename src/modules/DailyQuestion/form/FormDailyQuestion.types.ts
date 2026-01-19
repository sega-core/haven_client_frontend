export enum EDailyQuestionField {
  ANSWER = "ANSWER",
}

export type TDailyQuestionForm = {
  [EDailyQuestionField.ANSWER]: string;
};
