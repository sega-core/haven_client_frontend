/* eslint-disable @typescript-eslint/ban-ts-comment */
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
  position = "auto",
  onNext,
  onSkip,
  currentStep,
  totalSteps,
}: OnboardingOverlayProps) => {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  // 👉 найти элемент + скролл + корректный rect
  useEffect(() => {
    //@ts-ignore
    let timeoutId;

    const findTarget = () => {
      const el = document.getElementById(targetId);
      if (!el) return false;

      setTargetElement(el);

      el.classList.add("onboarding-highlight");

      // сначала скроллим
      el.scrollIntoView({ block: "center", behavior: "auto" });

      // потом ЖДЁМ layout
      timeoutId = setTimeout(() => {
        setTargetRect(el.getBoundingClientRect());
      }, 300);

      return true;
    };

    if (!findTarget()) {
      const observer = new MutationObserver(() => {
        if (findTarget()) observer.disconnect();
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      return () => {
        observer.disconnect();
            //@ts-ignore

        clearTimeout(timeoutId);
        if (targetElement) {
          targetElement.classList.remove("onboarding-highlight");
        }
      };
    }

    return () => {
          //@ts-ignore

      clearTimeout(timeoutId);
      if (targetElement) {
        targetElement.classList.remove("onboarding-highlight");
      }
    };
  }, [targetId]);

  // 👉 обновление позиции при скролле/resize
  useEffect(() => {
    if (!targetElement) return;

    const update = () => {
      setTargetRect(targetElement.getBoundingClientRect());
    };

    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);

    // visual viewport (ANDROID FIX)
    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);

    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
    };
  }, [targetElement]);

  if (!targetRect) return null;

  const getViewport = () => {
    const vv = window.visualViewport;

    return {
      width: vv?.width || window.innerWidth,
      height: vv?.height || window.innerHeight,
      offsetTop: vv?.offsetTop || 0,
      offsetLeft: vv?.offsetLeft || 0,
    };
  };

  const getTooltipPosition = () => {
    const spacing = 12;
    const tooltipWidth = 320;
    const tooltipHeight = 260;

    const viewport = getViewport();

    let top = 0;
    let left = 0;

    const centerX =
      targetRect.left + targetRect.width / 2 - tooltipWidth / 2;

    const centerY =
      targetRect.top + targetRect.height / 2 - tooltipHeight / 2;

    if (position === "top") {
      top = targetRect.top - tooltipHeight - spacing;
      left = centerX;
    } else if (position === "bottom") {
      top = targetRect.bottom + spacing;
      left = centerX;
    } else if (position === "left") {
      top = centerY;
      left = targetRect.left - tooltipWidth - spacing;
    } else if (position === "right") {
      top = centerY;
      left = targetRect.right + spacing;
    } else {
      const spaceAbove = targetRect.top;
      const spaceBelow = viewport.height - targetRect.bottom;

      if (spaceAbove > tooltipHeight + spacing) {
        top = targetRect.top - tooltipHeight - spacing;
        left = centerX;
      } else if (spaceBelow > tooltipHeight + spacing) {
        top = targetRect.bottom + spacing;
        left = centerX;
      } else {
        top = viewport.height / 2 - tooltipHeight / 2;
        left = viewport.width / 2 - tooltipWidth / 2;
      }
    }

    // clamp + учитываем viewport offset (ANDROID FIX)
    top = Math.max(
      spacing,
      Math.min(top, viewport.height - tooltipHeight - spacing),
    );

    left = Math.max(
      spacing,
      Math.min(left, viewport.width - tooltipWidth - spacing),
    );

    return {
      top: top + viewport.offsetTop,
      left: left + viewport.offsetLeft,
    };
  };

  const tooltipStyle = getTooltipPosition();

  return createPortal(
    <>
      {/* overlay */}
      <div className="fixed inset-0 z-40" onClick={onSkip} />

      {/* highlight */}
      <div
        className="absolute z-50 rounded-xl pointer-events-none"
        style={{
          top: targetRect.top + window.scrollY - 4,
          left: targetRect.left + window.scrollX - 4,
          width: targetRect.width + 8,
          height: targetRect.height + 8,
          boxShadow:
            "0 0 0 4px rgba(182, 135, 90, 0.6), 0 0 0 9999px rgba(0, 0, 0, 0.5)",
          borderRadius: "12px",
          transition: "all 0.2s ease",
        }}
      />

      {/* tooltip */}
      <div
        className="absolute z-50 w-[320px] bg-white-primary rounded-3xl shadow-2xl p-6"
        style={{
          top: tooltipStyle.top + window.scrollY,
          left: tooltipStyle.left + window.scrollX,
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