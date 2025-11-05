export enum EDailyQuestionField {
  ANSWER = "answer",
}

export type TDailyQuestionForm = {
  [EDailyQuestionField.ANSWER]: string;
};
