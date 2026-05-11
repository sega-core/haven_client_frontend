import { useEffect, useState } from "react";
import { useGetAuth } from "./useAuth";
import { useUpdateUser } from "./useUser";

export type OnboardingStep = {
  targetId: string;
  title: string;
  description: string;
  position?: "auto" | "top" | "bottom" | "left" | "right";
};

export enum EOnboardingTargetId {
  TARGET = "onboarding_target",
  BREATH = "onboarding_breath",
  META_CARD = "onboarding_metaCard",
  ZEN = "onboarding_zen",
  PROGRESS_LINE = "onboarding_progress_line",
  MOOD = "onboarding_mood",
  GRATITUDE = "onboarding_gratitude",
  DAILY_QUESTION = "onboarding_dailyQuestion",
  COIN = "onboarding_coin",
  PROFILE = "onboarding_profile",
  CALENDAR = "onboarding_calendar",
  COMUNITY = "onboarding_comunity",
  PRACTICES = "onboarding_practices",
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    targetId: EOnboardingTargetId.TARGET,
    title: "Трекер личной цели",
    description:
      "Создайте свою цель, назначьте дедлайн и следите за движением к ней прямо с главного экрана.",
  },
  {
    targetId: EOnboardingTargetId.MOOD,
    title: "Трекер настроения",
    description:
      "Фиксируйте свои эмоции и чувства. Это поможет вам анализировать свое состояние и развивать осознанность.",
    position: "top",
  },
  {
    targetId: EOnboardingTargetId.GRATITUDE,
    title: "Дневник благодарности",
    description:
      "Зафиксируйте моменты благодарности – себе, окружающим или всему, что вас радует.",
  },
  {
    targetId: EOnboardingTargetId.DAILY_QUESTION,
    title: "Ежедневный вопрос для самопознания",
    description:
      "Каждый день – новый вопрос, который поможет лучше понять себя и свои ценности.",
  },
  {
    targetId: EOnboardingTargetId.COIN,
    title: "Zen – это валюта приложения",
    description:
      "Зарабатывайте её каждый день за заполнение трекера настроения, дневника благодарности и вопроса дня.",
  },
  {
    targetId: EOnboardingTargetId.PROGRESS_LINE,
    title: "Ваша шкала прогресса",
    description:
      "Она показывает, сколько трекеров вы заполнили за день. Весь Zen вы получите только когда заполните шкалу целиком.",
  },
  {
    targetId: EOnboardingTargetId.PRACTICES,
    title: "Коллекции практик",
    description:
      "Открывайте новые методики! Оплатите сразу или используйте накопленные Zen для выгодной покупки.",
  },
  {
    targetId: EOnboardingTargetId.CALENDAR,
    title: "Календарь",
    description: "Изучай свою активность за любой день",
  },
  {
    targetId: EOnboardingTargetId.BREATH,
    title: "Дыхание",
    description:
      "Сделайте дыхательную практику в любой сложной момент, чтобы улучшить свое состояние.",
  },
  {
    targetId: EOnboardingTargetId.META_CARD,
    title: "Метафорические карты",
    description:
      "Воспользуйтесь этим инструментом самопомощи для того, чтобы найти ответ на свой вопрос. Вытащить МАК-карту можно только раз в день.",
  },
  {
    targetId: EOnboardingTargetId.ZEN,
    title: "Медитации",
    description:
      "Заходите в плейлист медитаций каждый раз, когда необходимо самостоятельно поддержать себя.",
  },
  {
    targetId: EOnboardingTargetId.PROFILE,
    title: "Профиль",
    description:
      "За ответами на вопросы и важной информацией загляните в свой профиль.",
  },
  {
    targetId: EOnboardingTargetId.COMUNITY,
    title: "Комьюнити",
    description:
      "Стань частью нашего сообщества – находи поддержку и единомышленников.",
  },
];

export const useOnboarding = () => {
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = ONBOARDING_STEPS[currentStepIndex];
  const totalSteps = ONBOARDING_STEPS.length;

  const { data, isSuccess } = useGetAuth();

  const { mutate } = useUpdateUser();

  const hasSeenOnboarding = isSuccess && data?.onboardingCompleted === true;

  useEffect(() => {
    if (isSuccess && !hasSeenOnboarding) {
      setIsOnboarding(true);
    } else if (isSuccess && hasSeenOnboarding) {
      setIsOnboarding(false);
    }
  }, [data, isSuccess, hasSeenOnboarding]);

  const nextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      completeOnboarding();
    }
  };

  const completeOnboarding = () => {
    setIsOnboarding(false);
    mutate({ onboardingCompleted: true });
  };

  const skipOnboarding = () => {
    setIsOnboarding(false);
    mutate({ onboardingCompleted: true });
  };

  return {
    isOnboarding,
    currentStep,
    currentStepIndex,
    totalSteps,
    nextStep,
    skipOnboarding,
    completeOnboarding,
  };
};
