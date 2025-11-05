import { FC, SVGProps } from 'react'
import { TIcon } from './Icon.types'
import Check from '../../assets/icons/check.svg?react'
import ChevronDown from '../../assets/icons/chevron-down.svg?react'
import ChevronLeft from '../../assets/icons/chevron-left.svg?react'
import ChevronRight from '../../assets/icons/chevron-right.svg?react'
import Good from '../../assets/icons/good.svg?react'
import Info from '../../assets/icons/info.svg?react'
import LockFilled from '../../assets/icons/lock-filled.svg?react'
import LockOutlined from '../../assets/icons/lock-outlined.svg?react'
import MeditationRound from '../../assets/icons/meditation-round.svg?react'
import Normal from '../../assets/icons/normal.svg?react'
import Plus from '../../assets/icons/plus.svg?react'
import Sad from '../../assets/icons/sad.svg?react'
import Setting from '../../assets/icons/setting.svg?react'
import StartFilled from '../../assets/icons/star-filled.svg?react'
import StartOutlined from '../../assets/icons/star-outlined.svg?react'
import Super from '../../assets/icons/super.svg?react'
import Terrible from '../../assets/icons/terrible.svg?react'
import ZenFilled from '../../assets/icons/zen-filled.svg?react'
import ZenOutlined from '../../assets/icons/zen-outlined.svg?react'

export const ICON_MAP: Partial<Record<TIcon, FC<SVGProps<SVGSVGElement>>>> = {
  'Check': Check,
  'ChevronDown': ChevronDown,
  'ChevronLeft': ChevronLeft,
  'ChevronRight': ChevronRight,
  'Good': Good,
  'Info': Info,
  'LockFilled': LockFilled,
  'LockOutlined': LockOutlined,
  'MeditationRound': MeditationRound,
  'Normal': Normal,
  'Plus': Plus,
  'Sad': Sad,
  'Setting': Setting,
  'StartFilled': StartFilled,
  'StartOutlined': StartOutlined,
  'Super': Super,
  'Terrible': Terrible,
  'ZenFilled': ZenFilled,
  'ZenOutlined': ZenOutlined,
} as const;


