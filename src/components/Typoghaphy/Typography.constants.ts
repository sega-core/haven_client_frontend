/* import { FC, SVGProps } from 'react'

export const TYPOGRAPHY_MAP: Partial<Record<TIcon, FC<SVGProps<SVGSVGElement>>>> = {
  'size-xs-12/16-regular': Check,
  'size-xs-12/16-medium': Check,
  'size-xs-12/16-semibold': Check,
  'size-xs-12/16-bold': Check,
  'size-xs-12/16-extrabold': Check,
} as const;

 */
const typographyMap = {
  heading: {
    xs: {
      fontSize: '16px',
      lineHeight: '24px',
      weights: ['regular', 'medium', 'semibold', 'bold']
    },
    s: {
      fontSize: '20px',
      lineHeight: '28px',
      weights: ['regular', 'medium', 'semibold', 'bold']
    },
    md: {
      fontSize: '24px',
      lineHeight: '32px',
      weights: ['regular', 'medium', 'semibold', 'bold']
    },
    lg: {
      fontSize: '28px',
      lineHeight: '36px',
      weights: ['regular', 'medium', 'semibold', 'bold']
    }
  },
  body: {
    xxs: {
      fontSize: '9px',
      lineHeight: '14px',
      weights: ['regular', 'medium', 'semibold', 'bold', 'extrabold']
    },
    xs: {
      fontSize: '12px',
      lineHeight: '16px',
      weights: ['regular', 'medium', 'semibold', 'bold', 'extrabold']
    },
    s: {
      fontSize: '14px',
      lineHeight: '20px',
      weights: ['regular', 'medium', 'semibold', 'bold', 'extrabold']
    },
    md: {
      fontSize: '16px',
      lineHeight: '24px',
      weights: ['regular', 'medium', 'semibold', 'bold', 'extrabold']
    },
    lg: {
      fontSize: '18px',
      lineHeight: '28px',
      weights: ['regular', 'medium', 'semibold', 'bold', 'extrabold']
    }
  }
};

export default typographyMap;
