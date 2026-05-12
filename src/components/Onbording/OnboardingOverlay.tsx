import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Typography } from "../Typography";
import { Button } from "@heroui/button";

interface OnboardingOverlayProps {
  targetId: string;
  title: string;
  description: string;
  position?: "top" | "bottom" | "left" | "right" | "auto";
  onNext: () => void;
  onSkip: () => void;
  currentStep: number;
  totalSteps: number;
}

export const OnboardingOverlay = ({
  targetId,
  title,
  description,
  position,
  onNext,
  onSkip,
  currentStep,
  totalSteps,
}: OnboardingOverlayProps) => {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const findTarget = () => {
      const element = document.getElementById(targetId);
      if (element) {
        setTargetElement(element);
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);

        element.classList.add("onboarding-highlight");
        element.scrollIntoView({ behavior: "smooth", block: "center" });

        return true;
      }
      return false;
    };

    if (!findTarget()) {
      const observer = new MutationObserver(() => {
        if (findTarget()) {
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      return () => {
        observer.disconnect();
        if (targetElement) {
          targetElement.classList.remove("onboarding-highlight");
        }
      };
    }

    return () => {
      if (targetElement) {
        targetElement.classList.remove("onboarding-highlight");
      }
    };
  }, [targetId, targetElement]);

  if (!targetRect) return null;

const getTooltipPosition = () => {
  const spacing = 12;
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  const tooltipWidth = 320;
  const tooltipHeight = 260;

  let top = 0;
  let left = 0;

  if (position === 'top') {
    top = targetRect.top - tooltipHeight - spacing;
    left = targetRect.left + targetRect.width / 2 - tooltipWidth / 2;
  } 
  else if (position === 'bottom') {
    top = targetRect.bottom + spacing;
    left = targetRect.left + targetRect.width / 2 - tooltipWidth / 2;
  }
  else if (position === 'left') {
    top = targetRect.top + targetRect.height / 2 - tooltipHeight / 2;
    left = targetRect.left - tooltipWidth - spacing;
  }
  else if (position === 'right') {
    top = targetRect.top + targetRect.height / 2 - tooltipHeight / 2;
    left = targetRect.right + spacing;
  }
  else {
    const spaceAbove = targetRect.top;
    const spaceBelow = viewportHeight - targetRect.bottom;
    
    if (spaceAbove >= tooltipHeight + spacing) {
      top = targetRect.top - tooltipHeight - spacing;
      left = targetRect.left + targetRect.width / 2 - tooltipWidth / 2;
    } 
    else if (spaceBelow >= tooltipHeight + spacing) {
      top = targetRect.bottom + spacing;
      left = targetRect.left + targetRect.width / 2 - tooltipWidth / 2;
    }
    else {
      top = viewportHeight / 2 - tooltipHeight / 2;
      left = viewportWidth / 2 - tooltipWidth / 2;
    }
  }

  top = Math.max(
    spacing,
    Math.min(top, viewportHeight - tooltipHeight - spacing),
  );
  left = Math.max(
    spacing,
    Math.min(left, viewportWidth - tooltipWidth - spacing),
  );

  return { top, left };
};

  const tooltipStyle = getTooltipPosition();

  return createPortal(
    <>
      <div className="fixed inset-0 z-40" onClick={onSkip} />

      <div
        className="fixed z-50 rounded-xl"
        style={{
          top: targetRect.top - 4,
          left: targetRect.left - 4,
          width: targetRect.width + 8,
          height: targetRect.height + 8,
          boxShadow:
            "0 0 0 4px rgba(182, 135, 90, 0.6), 0 0 0 9999px rgba(0, 0, 0, 0.5)",
          borderRadius: "12px",
          pointerEvents: "none",
          transition: "all 0.3s ease",
        }}
      />

      <div
        className="fixed z-50 w-[320px] bg-white-primary rounded-3xl shadow-2xl p-6 animate-fade-in"
        style={{
          top: tooltipStyle.top,
          left: tooltipStyle.left,
        }}
      >
        <div className="text-center">
          <Typography
            type="heading-s"
            weight="semibold"
            className="text-beige-primary mb-3"
          >
            {title}
          </Typography>
          <Typography
            type="body-s"
            className="text-brown-primary leading-relaxed mb-6"
          >
            {description}
          </Typography>
        </div>

        <div className="flex items-center justify-between gap-3">
          <Typography
            type="body-s"
            className="text-brown-primary"
            weight="semibold"
          >
            {currentStep + 1} / {totalSteps}
          </Typography>
          <Button
            size="sm"
            radius="full"
            className="bg-beige-primary text-white min-w-20"
            onPress={onNext}
          >
            {currentStep === totalSteps - 1 ? "Готово" : "Далее"}
          </Button>
        </div>
      </div>
    </>,
    document.body,
  );
};
