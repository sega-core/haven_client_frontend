import { ETargetField, TTargetForm } from "./FormTarget.types"

export const FORM_ID = 'formTargetId'

export const INITIAL_FORM: TTargetForm = {
  [ETargetField.TITLE]: '',
  [ETargetField.WEEKDAYS]: {},
  [ETargetField.COLOR]: '#c6a637',
}