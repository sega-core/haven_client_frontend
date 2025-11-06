import { FC, SVGProps } from 'react'
import { TIcon } from './Icon.types'
import Check from '../../assets/icons/check.svg?react'
import CheckFilled from '../../assets/icons/check-filled.svg?react'
import CheckOutlined from '../../assets/icons/check-outlined.svg?react'
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
import StartFilled from '../../assets/icons/star-filled.svg?react'
import StartOutlined from '../../assets/icons/star-outlined.svg?react'
import Super from '../../assets/icons/super.svg?react'
import Terrible from '../../assets/icons/terrible.svg?react'
import ZenFilled from '../../assets/icons/zen-filled.svg?react'
import ZenOutlined from '../../assets/icons/zen-outlined.svg?react'
import AlarmClock from '../../assets/icons/alarm-clock.svg?react'
import CalendarDays from '../../assets/icons/calendar-days.svg?react'
import Calendar from '../../assets/icons/calendar.svg?react'
import Close from '../../assets/icons/close.svg?react'
import Goal from '../../assets/icons/goal.svg?react'
import Heart from '../../assets/icons/heart.svg?react'
import House from '../../assets/icons/house.svg?react'
import LibreryBig from '../../assets/icons/librery-big.svg?react'
import Loader from '../../assets/icons/loader.svg?react'
import MessageCircle from '../../assets/icons/message-circle.svg?react'
import PauseFilled from '../../assets/icons/pause-filled.svg?react'
import PauseOutlined from '../../assets/icons/pause-outlined.svg?react'
import PenSquare from '../../assets/icons/pen-square.svg?react'
import PlayBomb from '../../assets/icons/play-bomb.svg?react'
import PlayFilled from '../../assets/icons/play-filled.svg?react'
import PlayOutlined from '../../assets/icons/play-outlined.svg?react'
import PlayWind from '../../assets/icons/play-wind.svg?react'
import Refresh from '../../assets/icons/refresh.svg?react'
import Repeat from '../../assets/icons/repeat.svg?react'
import Settings from '../../assets/icons/settings.svg?react'
import Shuffle from '../../assets/icons/shuffle.svg?react'
import StepBack from '../../assets/icons/step-back.svg?react'
import StepForward from '../../assets/icons/step-forward.svg?react'
import Trash from '../../assets/icons/trash.svg?react'
import User from '../../assets/icons/user.svg?react'
import ZenLineStage0 from '../../assets/icons/zen-line-stage0.svg?react'
import ZenLineStage1 from '../../assets/icons/zen-line-stage1.svg?react'
import ZenLineStage2 from '../../assets/icons/zen-line-stage2.svg?react'
import ZenLineStage3 from '../../assets/icons/zen-line-stage3.svg?react'
import ZenLineStage4 from '../../assets/icons/zen-line-stage4.svg?react'

export const ICON_MAP: Partial<Record<TIcon, FC<SVGProps<SVGSVGElement>>>> = {
  'Check': Check,
  'CheckFilled': CheckFilled,
  'CheckOutlined': CheckOutlined,
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
  'Settings': Settings,
  'StartFilled': StartFilled,
  'StartOutlined': StartOutlined,
  'Super': Super,
  'Terrible': Terrible,
  'ZenFilled': ZenFilled,
  'ZenOutlined': ZenOutlined,
  'AlarmClock': AlarmClock,
  "CalendarDays": CalendarDays,
  "Calendar": Calendar,
  "Close": Close,
  "Goal": Goal,
  "Heart": Heart,
  "House": House,
  "LibreryBig": LibreryBig,
  "Loader": Loader,
  "MessageCircle": MessageCircle,
  "PauseFilled": PauseFilled,
  "PauseOutlined": PauseOutlined,
  "PenSquare": PenSquare,
  "PlayBomb": PlayBomb,
  "PlayFilled": PlayFilled,
  "PlayOutlined": PlayOutlined,
  "PlayWind": PlayWind,
  "Refresh": Refresh,
  "Repeat": Repeat,
  "Shuffle": Shuffle,
  "StepBack": StepBack,
  "StepForward": StepForward,
  "Trash": Trash,
  "User": User,
  "ZenLineStage0": ZenLineStage0,
  "ZenLineStage1": ZenLineStage1,
  "ZenLineStage2": ZenLineStage2,
  "ZenLineStage3": ZenLineStage3,
  "ZenLineStage4": ZenLineStage4,
} as const;


