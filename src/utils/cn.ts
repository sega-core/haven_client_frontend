// utils/cn.ts

/**
 * Утилита для условного объединения классов
 * Аналог classNames из 'classnames' или clsx
 * 
 * @example
 * cn('base-class', condition && 'conditional-class', ['array', 'of-classes'])
 * cn('btn', 'btn-primary', isLarge && 'btn-large', isDisabled && 'btn-disabled')
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === 'string') {
      if (input.trim()) {
        classes.push(input.trim());
      }
    } else if (typeof input === 'number') {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      // Рекурсивно обрабатываем массивы
      const inner = cn(...input);
      if (inner) {
        classes.push(inner);
      }
    } else if (typeof input === 'object') {
      // Обрабатываем объекты { className: boolean }
      if (input.toString === Object.prototype.toString) {
        for (const [key, value] of Object.entries(input)) {
          if (value && key.trim()) {
            classes.push(key.trim());
          }
        }
      } else {
        // Для других объектов используем строковое представление
        classes.push(String(input));
      }
    }
  }

  return classes.filter(Boolean).join(' ');
}

// Типы для TypeScript
type ClassValue = 
  | string 
  | number 
  | boolean 
  | null 
  | undefined 
  | ClassArray 
  | ClassDictionary
  | Record<string, unknown>;

type ClassArray = Array<ClassValue>
interface ClassDictionary {
  [id: string]: boolean | null | undefined;
}

export default cn;