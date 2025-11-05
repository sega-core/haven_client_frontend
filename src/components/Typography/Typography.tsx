// Typography.tsx
import { TYPOGRAPHY_MAP } from "./Typography.constants";
import { TTypography } from "./Typography.types";

export const Typography = ({
  type,
  weight = "regular",
  children, // Текст или элементы
  className = "", // Дополнительные классы Tailwind
  as = null, // Элемент: 'h1', 'h2', 'p', 'span' и т.д. (по умолчанию: для heading - 'h1', для body - 'p')
}: {
  type: TTypography;
  weight?: "regular" | "medium" | "semibold" | "bold" | "extrabold";
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "p" | "span" | null;
}) => {
  const target = TYPOGRAPHY_MAP[type];
  const isHeading = type.startsWith("heading");
  const defaultAs = isHeading ? "h1" : "p";
  const Component = as || defaultAs;

  // Генерируем классы на основе type, size и weight
  // Используем leading-[value] вместо line-height-[value], так как line-height - не стандартный класс Tailwind (должен быть leading-)
  const baseClass = `text-[${target.fontSize}] leading-[${target.lineHeight}] font-${weight}`;
  const combinedClass = `${baseClass} ${className}`.trim();

  return <Component className={combinedClass}>{children}</Component>;
};
