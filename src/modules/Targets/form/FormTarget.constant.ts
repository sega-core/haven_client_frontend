import { ETargetColor, ETargetField, TTargetForm } from "./FormTarget.types"

export const FORM_ID = 'formTargetId'

export const INITIAL_FORM: TTargetForm = {
  [ETargetField.TITLE]: '',
  /* [ETargetField.DATE]: '', */
  [ETargetField.WEEKDAYS]: {},
  /* [ETargetField.NOTIFICATION_TIME]: '', */
  [ETargetField.COLOR]: ETargetColor.COLOR1,
}