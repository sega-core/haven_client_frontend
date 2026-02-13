import { FieldInputProps } from "react-final-form";
import { useRef } from "react";

const DEFAULT_ERROR_MSG = "Обязательное поле";

interface HavenTextareaProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: FieldInputProps<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta: any;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  isRequired?: boolean;
  errorMessage?: string;
  label?: string;
  fullWidth?: boolean;
  rows?: number;
  maxLength?: number;
  showCount?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

export const Textarea = ({
  input,
  meta,
  placeholder = "Введите текст...",
  containerClassName = "",
  isRequired,
  errorMessage = DEFAULT_ERROR_MSG,
  label,
  fullWidth = true,
  rows = 4,
  maxLength,
  showCount = false,
  resize = "vertical",
}: HavenTextareaProps) => {
  const showError = meta.touched && meta.error;
  const errorText = meta.error || errorMessage;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Определяем класс для resize
  const resizeClass = {
    none: "resize-none",
    vertical: "resize-y",
    horizontal: "resize-x",
    both: "resize",
  }[resize];

  return (
    <div
      className={`
        flex 
        flex-col 
        gap-1
        ${fullWidth ? "w-full" : ""}
      `}
    >
      {label && (
        <label
          className="
              text-sm 
              font-medium 
              text-[rgba(26,26,26,0.7)]
              mb-1
              px-1
              cursor-pointer
              w-fit
            "
          onClick={() => textareaRef.current?.focus()}
        >
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        onClick={() => textareaRef.current?.focus()}
        className={`
            px-4 py-3 
            flex 
            flex-col 
            justify-center 
            items-start 
            gap-2
            rounded-[16px]
            transition-all
            duration-200
            relative
            cursor-text
            w-full
            ${
              showError
                ? "bg-[rgba(239,68,68,0.20)] ring-2 ring-red-500/50"
                : "bg-[rgba(182,135,90,0.20)] hover:bg-[rgba(182,135,90,0.30)]"
            }
            ${meta.active ? "ring-2 ring-[rgba(182,135,90,0.40)]" : ""}
            ${containerClassName}
          `}
      >
        <textarea
          {...input}
          value={input.value || ""}
          required={isRequired}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          className={`
              w-full
              bg-transparent
              outline-none
              border-none
              text-[#1a1a1a]
              placeholder:text-[rgba(26,26,26,0.4)]
              text-base
              font-normal
              leading-normal
              disabled:opacity-50
              disabled:cursor-not-allowed
              ${resizeClass}
            `}
        />
      </div>

      {/* Счетчик символов и ошибка */}
      <div className="flex justify-between items-center px-1">
        {showError && (
          <p
            className="
                text-sm 
                text-red-500 
                animate-fadeIn
              "
          >
            {errorText}
          </p>
        )}
        {showCount && maxLength && (
          <span
            className={`
              text-xs 
              ml-auto
              ${
                (input.value?.length || 0) >= maxLength
                  ? "text-red-500"
                  : "text-[rgba(26,26,26,0.4)]"
              }
            `}
          >
            {input.value?.length || 0}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};
