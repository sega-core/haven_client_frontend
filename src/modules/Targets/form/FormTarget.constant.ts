import { ETargetField, TTargetForm } from "./FormTarget.types"

export const FORM_ID = 'formTargetId'

export const INITIAL_FORM: TTargetForm = {
  [ETargetField.NAME]: '',
  [ETargetField.START_DATE]: '',
  [ETargetField.END_DATE]: '',
  [ETargetField.NOTIFICATION_DAYS]: {},
  [ETargetField.NOTIFICATION_TIME]: '',
  [ETargetField.COLOR]: 'stroke-beige-primary',
}

export const LABELS = {
  [ETargetField.NAME]: 'Название цели',
  [ETargetField.START_DATE]: 'Дата с',
  [ETargetField.END_DATE]: 'Дата по',
  [ETargetField.NOTIFICATION_DAYS]: '',
  [ETargetField.NOTIFICATION_TIME]: '',
}