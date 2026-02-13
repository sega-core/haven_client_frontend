// Нативный компонент для ввода времени с поддержкой Final Form
import { FieldInputProps } from "react-final-form";
import { useRef } from "react";

const DEFAULT_ERROR_MSG = "Обязательное поле";

interface HavenNativeTimeProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: FieldInputProps<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta: any;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  isRequired?: boolean;
  errorMessage?: string;
  minTime?: string; // Формат HH:mm
  maxTime?: string; // Формат HH:mm
  step?: number; // Шаг в секундах, по умолчанию 60 (1 минута)
  label?: string;
  showSeconds?: boolean;
  format24h?: boolean;
}

export const TimePicker = ({
  input,
  meta,
  placeholder = "Выберите время",
  containerClassName = "",
  isRequired,
  errorMessage = DEFAULT_ERROR_MSG,
  minTime,
  maxTime,
  step = 60,
  label,
  showSeconds = false,
}: HavenNativeTimeProps) => {
  const showError = meta.touched && meta.error;
  const errorText = meta.error || errorMessage;
  const inputRef = useRef<HTMLInputElement>(null);

  // Форматирование времени для отображения
  const formatTimeForDisplay = (timeValue: string) => {
    if (!timeValue) return "";

    if (showSeconds) {
      return timeValue; // уже в формате HH:mm:ss
    }

    // Обрезаем секунды если они есть
    return timeValue.split(":").slice(0, 2).join(":");
  };

  const displayValue = input.value ? formatTimeForDisplay(input.value) : "";

  // Обработчик клика по контейнеру
  const handleContainerClick = () => {
    inputRef.current?.showPicker();
  };

  // Определяем тип input в зависимости от наличия секунд
  const timeType = showSeconds ? "datetime-local" : "time";

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
          px-4 py-3 
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
        {/* Нативный input для времени */}
        <input
          {...input}
          ref={inputRef}
          type={timeType}
          value={input.value || ""}
          min={minTime}
          max={maxTime}
          step={step}
          required={isRequired}
          onChange={(e) => {
            let value = e.target.value;
            if (timeType === "datetime-local" && value) {
              // Преобразуем datetime-local в простое время
              value = value.split("T")[1] || value;
            }
            input.onChange(value);
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

          {/* Иконка часов */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[rgba(182,135,90,0.80)]"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" />
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
