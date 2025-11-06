export const Typography = ({
  type = "body", // 'heading' или 'body'
  size = "md", // Для heading: 'xs', 's', 'md', 'lg'; для body: 'xxs', 'xs', 's', 'md', 'lg'
  weight = "regular", // 'regular', 'medium', 'semibold', 'bold', 'extrabold'
  children, // Текст или элементы
  className = "", // Дополнительные классы Tailwind
  as = null, // Элемент: 'h1', 'h2', 'p', 'span' и т.д. (по умолчанию: для heading - 'h1', для body - 'p')
}: {
  type?: "heading" | "body";
  size?: "xxs" | "xs" | "s" | "md" | "lg";
  weight?: "regular" | "medium" | "semibold" | "bold" | "extrabold";
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "p" | "span" | null;
}) => {
  // Определяем элемент по умолчанию
  const defaultAs = type === "heading" ? "h1" : "p";
  const Component = as || defaultAs;

  // Генерируем классы на основе type, size и weight
  const baseClass = `text-${type}-${size} font-${weight}`;
  const combinedClass = `${baseClass} ${className}`.trim();

  return <Component className={combinedClass}>{children}</Component>;
};
