import { useRef } from "react";

export const useRipple = () => {
  //TODO: доработать, накинуть на чекбокс дей, в сафари криво работает
  const wrapperRef = useRef<HTMLElement | null>(null);
  const rippleRef = useRef<HTMLSpanElement | null>(null);

  const trigger = (e: React.MouseEvent) => {
    const wrapper = wrapperRef.current;
    const ripple = rippleRef.current;
    if (!wrapper || !ripple) return;

    const rect = wrapper.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    ripple.classList.remove("rui-ripple-animate");
    void ripple.offsetWidth; // reflow → restart animation
    ripple.classList.add("rui-ripple-animate");
  };

  return {
    wrapperRef,
    rippleRef,
    trigger,
  };
};
