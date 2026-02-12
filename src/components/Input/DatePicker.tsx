// Нативный компонент для ввода даты с поддержкой Final Form
import { FieldInputProps } from "react-final-form";
import { format } from "date-fns";
import { useRef } from "react";

const DEFAULT_ERROR_MSG = "Обязательное поле";

interface HavenNativeDateProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: FieldInputProps<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta: any;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  isRequired?: boolean;
  errorMessage?: string;
  minDate?: string;
  maxDate?: string;
  label?: string;
}

export const DatePicker = ({
  input,
  meta,
  placeholder = "Выберите дату",
  containerClassName = "",
  isRequired,
  errorMessage = DEFAULT_ERROR_MSG,
  minDate,
  maxDate,
  label,
}: HavenNativeDateProps) => {
  const showError = meta.touched && meta.error;
  const errorText = meta.error || errorMessage;
  const inputRef = useRef<HTMLInputElement>(null);

  // Форматирование даты для отображения
  const displayValue = input.value
    ? format(new Date(input.value), "dd.MM.yyyy")
    : "";

  // Обработчик клика по контейнеру
  const handleContainerClick = () => {
    inputRef.current?.showPicker(); // Для современных браузеров
    // или
    inputRef.current?.click(); // Альтернативный вариант
  };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          className="
            text-sm 
            font-medium 
            text-[rgba(26,26,26,0.7)]
            mb-1
            px-1
            cursor-pointer
          "
          onClick={handleContainerClick}
        >
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        onClick={handleContainerClick}
        className={`
          p-4 
          flex 
          flex-col 
          justify-center 
          items-start 
          gap-4
          rounded-[16px]
          transition-all
          duration-200
          relative
          cursor-pointer
          ${
            showError
              ? "bg-[rgba(239,68,68,0.20)] ring-2 ring-red-500/50"
              : "bg-[rgba(182,135,90,0.20)] hover:bg-[rgba(182,135,90,0.30)]"
          }
          ${meta.active ? "ring-2 ring-[rgba(182,135,90,0.40)]" : ""}
          ${containerClassName}
        `}
      >
        {/* Нативный input - видимый для скринридеров но прозрачный */}
        <input
          {...input}
          ref={inputRef}
          type="date"
          value={input.value || ""}
          min={minDate}
          max={maxDate}
          required={isRequired}
          onChange={(e) => {
            input.onChange(e.target.value);
          }}
          className="
            absolute
            inset-0
            w-full
            h-full
            opacity-0
            cursor-pointer
          "
        />

        {/* Отображаемое значение */}
        <div
          className="
          w-full
          flex
          items-center
          justify-between
          text-[#1a1a1a]
          font-normal
          leading-normal
          pointer-events-none
        "
        >
          <span
            className={`
            ${!input.value ? "text-[rgba(26,26,26,0.4)]" : ""}
          `}
          >
            {input.value ? displayValue : placeholder}
          </span>

          {/* Иконка календаря */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[rgba(182,135,90,0.80)]"
          >
            <rect
              x="3"
              y="4"
              width="18"
              height="18"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M3 8H21" stroke="currentColor" strokeWidth="2" />
            <path d="M8 2V6" stroke="currentColor" strokeWidth="2" />
            <path d="M16 2V6" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Error message */}
      {showError && (
        <p
          className="
          text-sm 
          text-red-500 
          mt-1 
          px-4
          animate-fadeIn
        "
        >
          {errorText}
        </p>
      )}
    </div>
  );
};
