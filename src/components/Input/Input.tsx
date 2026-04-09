import { FieldInputProps } from "react-final-form";
import { DEFAULT_ERROR_MSG } from "../../constats";

interface HavenInputProps {
  input: FieldInputProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta: any;
  placeholder?: string;
  type?: string;
  className?: string;
  containerClassName?: string;
  isRequired?: boolean;
  errorMessage?: string;
  maxLength?: number;
  showCount?: boolean;
}

export const Input = ({
  input,
  meta,
  placeholder = "Введите текст...",
  type = "text",
  className = "",
  containerClassName = "",
  isRequired,
  maxLength,
  showCount = true,
  errorMessage = DEFAULT_ERROR_MSG,
}: HavenInputProps) => {
  const showError = meta.touched && meta.error;
  const errorText = meta.error || errorMessage;

  const currentLength = input.value?.length || 0;
  const remainingChars = currentLength;

  return (
    <div className="flex flex-col gap-1">
      <div
        className={`
          px-4 py-3 
          flex 
          flex-col 
          justify-center 
          items-start 
          gap-4
          rounded-2xl
          transition-all
          duration-200
          ${
            showError
              ? "bg-[rgba(239,68,68,0.20)] ring-2 ring-red-500/50"
              : "bg-[rgba(182,135,90,0.20)] hover:bg-[rgba(182,135,90,0.30)]"
          }
          ${meta.active ? "ring-2 ring-[rgba(182,135,90,0.40)]" : ""}
          ${containerClassName}
        `}
      >
        <input
          {...input}
          type={type}
          placeholder={placeholder}
          required={isRequired || showError}
          maxLength={maxLength}
          className={`
            w-full
            bg-transparent
            outline-none
            border-none
            text-[#1a1a1a]
            placeholder:text-[rgba(26,26,26,0.4)]
            font-normal
            leading-normal
            disabled:opacity-50
            disabled:cursor-not-allowed
            ${className}
          `}
        />
      </div>

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

      {showCount && maxLength && (
        <div className="flex flex-col items-end">
          <span
            className={`
                text-xs 
                font-mono
                whitespace-nowrap
                ${
                  remainingChars > maxLength - 10
                    ? "text-orange-500"
                    : "text-[rgba(26,26,26,0.4)]"
                }
              `}
          >
            {remainingChars} / {maxLength}
          </span>
        </div>
      )}
    </div>
  );
};
