import { EDailyQuestionField, TDailyQuestionForm } from "./FormDailyQuestion.types"

export const FORM_ID = 'dailyQuestionFormId'

export const INITIAL_FORM: TDailyQuestionForm = {
  [EDailyQuestionField.ANSWER]: '',
}