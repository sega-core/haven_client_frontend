// hooks/useOnboarding.ts
import { useEffect, useState } from "react";

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
    title: "Цели",
    description: "Создавайте и отслеживайте свои цели",
  },
  {
    targetId: EOnboardingTargetId.BREATH,
    title: "breath",
    description: "breath",
  },
  {
    targetId: EOnboardingTargetId.META_CARD,
    title: "metaCard",
    description: "metaCard",
  },
  {
    targetId: EOnboardingTargetId.ZEN,
    title: "zen",
    description: "zen",
  },
  {
    targetId: EOnboardingTargetId.PROGRESS_LINE,
    title: "Ваш прогресс",
    description:
      "Здесь отображается ваш текущий уровень прогресса. Выполняйте практики, чтобы заполнять шкалу.",
  },
  {
    targetId: EOnboardingTargetId.MOOD,
    title: "obbording_mood",
    description: "obbording_mood",
    position: "top",
  },
  {
    targetId: EOnboardingTargetId.GRATITUDE,
    title: "obbording_gratitude",
    description: "obbording_gratitude",
  },
  {
    targetId: EOnboardingTargetId.DAILY_QUESTION,
    title: "obbording_dailyQuestion",
    description: "obbording_dailyQuestion",
  },
  {
    targetId: EOnboardingTargetId.COIN,
    title: "obbording_coin",
    description: "obbording_coin",
  },
  {
    targetId: EOnboardingTargetId.PROFILE,
    title: "obbording_profile",
    description: "obbording_profile",
  },
  {
    targetId: EOnboardingTargetId.CALENDAR,
    title: "obbording_calendar",
    description: "obbording_calendar",
  },
  {
    targetId: EOnboardingTargetId.COMUNITY,
    title: "obbording_comunity",
    description: "obbording_comunity",
  },
  {
    targetId: EOnboardingTargetId.PRACTICES,
    title: "obbording_practices",
    description: "obbording_practices",
  },
];

export const useOnboarding = () => {
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = ONBOARDING_STEPS[currentStepIndex];
  const totalSteps = ONBOARDING_STEPS.length;

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("onboarding_completed");
    const isNewUser = localStorage.getItem("is_new_user") === "true";

    if (!hasSeenOnboarding && isNewUser) {
      setIsOnboarding(true);
    }
  }, []);

  const nextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      completeOnboarding();
    }
  };

  const completeOnboarding = () => {
    setIsOnboarding(false);
    localStorage.setItem("onboarding_completed", "true");
    localStorage.removeItem("is_new_user");
  };

  const skipOnboarding = () => {
    setIsOnboarding(false);
    localStorage.setItem("onboarding_completed", "true");
    localStorage.removeItem("is_new_user");
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
