import { TIcon } from "../../components/Icon/Icon.types";
import { TEmotionId } from "./ Nastroenie.types";

export const NASTROENIE_CHIPS: { label: string; id: TEmotionId; iconId: TIcon }[] =
  [
    {
      label: "супер",
      id: "Super",
      iconId: "Super",
    },
    {
      label: "хорошо",
      id: "Good",
      iconId: "Good",
    },
    {
      label: "норм",
      id: "Normal",
      iconId: "Normal",
    },
    {
      label: "плохо",
      id: "Sad",
      iconId: "Sad",
    },
    {
      label: "ужасно",
      id: "Terrible",
      iconId: "Terrible",
    },
  ];

export const EMOTIONS_CHIPS: { label: string; id: TEmotionId }[] = [
  {
    label: "тоска",
    id: "Melancholy",
  },
  {
    label: "уныние",
    id: "Dejection",
  },
  {
    label: "грусть",
    id: "Sadness",
  },
  {
    label: "обида",
    id: "Resentment",
  },
  {
    label: "отчаяние",
    id: "Despair",
  },
  {
    label: "фрустрация",
    id: "Frustration",
  },
];

export const FEELS_CHIPS: { label: string; id: TEmotionId }[] = [
  {
    label: "усталость",
    id: "Fatigue",
  },
  {
    label: "раздражение",
    id: "Irritation",
  },
  {
    label: "растерянность",
    id: "Confusion",
  },
  {
    label: "сомнения",
    id: "Doubt",
  },
  {
    label: "тревога",
    id: "Anxiety",
  },
  {
    label: "грусть",
    id: "Sadness",
  },
  {
    label: "меланхолия",
    id: "Melancholy",
  },
  {
    label: "злость",
    id: "Anger",
  },
  {
    label: "апатичность",
    id: "Apathy",
  },
  {
    label: "слабость",
    id: "Weakness",
  },
  {
    label: "сожаление",
    id: "Regret",
  },
  {
    label: "скука",
    id: "Boredom",
  },
  {
    label: "неприятие",
    id: "Rejection",
  },
];
