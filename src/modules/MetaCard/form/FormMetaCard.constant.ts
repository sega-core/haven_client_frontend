import { EMetaCardField, TMetaCardForm } from "./FormMetaCard.types"

export const FORM_ID = 'formMetaCardId'

export const INITIAL_FORM: TMetaCardForm = {
  [EMetaCardField.SEEN]: '',
  [EMetaCardField.FELT]: '',
  [EMetaCardField.UNDERSTOOD]: '',
}

export const FIELD_LABEL_MAP = {
  [EMetaCardField.SEEN]: 'Я увидел',
  [EMetaCardField.FELT]: 'Я почувствовал',
  [EMetaCardField.UNDERSTOOD]: 'Я понял',
}