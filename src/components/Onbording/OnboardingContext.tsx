import { createContext, useContext, ReactNode } from 'react';
import { OnboardingStep, useOnboarding } from '../../hooks';
import { OnboardingOverlay } from './OnboardingOverlay';

interface OnboardingContextType {
  isOnboarding: boolean;
  currentStep: OnboardingStep | null;
  nextStep: () => void;
  skipOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboardingContext = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboardingContext must be used within OnboardingProvider');
  }
  return context;
};

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const {
    isOnboarding,
    currentStep,
    currentStepIndex,
    totalSteps,
    nextStep,
    skipOnboarding,
  } = useOnboarding();

  return (
    <OnboardingContext.Provider
      value={{
        isOnboarding,
        currentStep,
        nextStep,
        skipOnboarding,
      }}
    >
      {children}
      {isOnboarding && currentStep && (
        <OnboardingOverlay
          targetId={currentStep.targetId}
          title={currentStep.title}
          description={currentStep.description}
          position={currentStep.position}
          onNext={nextStep}
          onSkip={skipOnboarding}
          currentStep={currentStepIndex}
          totalSteps={totalSteps}
        />
      )}
    </OnboardingContext.Provider>
  );
};