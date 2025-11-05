// TypographyMap.ts

import { TTypography } from "./Typography.types";

export interface ITypographyStyle {
  fontSize: string;
  lineHeight: string;
  type: string
}

export const TYPOGRAPHY_MAP: Record<TTypography, ITypographyStyle> = {
  'heading-xs': {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    type: "heading"
  },
  'heading-s': {
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    type: "heading"
  },
  'heading-md': {
    fontSize: '1.5rem',
    lineHeight: '2rem',
    type: "heading"
  },
  'heading-lg': {
    fontSize: '1.75rem',
    lineHeight: '2.25rem',
    type: "heading"
  },
  'body-xxs': {
    fontSize: '0.5625rem',
    lineHeight: '0.875rem',
    type: "body"
  },
  'body-xs': {
    fontSize: '0.75rem',
    lineHeight: '1rem',
    type: "body"
  },
  'body-s': {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    type: "body"
  },
  'body-md': {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    type: "body"
  },
  'body-lg': {
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
    type: "body"
  },
} as const;

export default TYPOGRAPHY_MAP;
