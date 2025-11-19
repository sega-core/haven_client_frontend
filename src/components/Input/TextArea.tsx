import { Textarea as HeroUITextarea } from "@heroui/input";

export const TextArea = ({
  placeholder,
  value,
  onChange,
  ...props
}: {
  placeholder: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}) => {
  //TODO: цвет bg при фокусе и ховере
  return (
    <HeroUITextarea
      label={placeholder}
      placeholder={""}
      value={value}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      onChange={onChange}
      classNames={{
        base: "w-full rounded-2xl bg-beige-tertiary transition-colors duration-300 ease-in-out",
        inputWrapper: "bg-beige-tertiary",
        innerWrapper: "bg-beige-tertiary",
        input:
          "bg-transparent placeholder-transparent resize-none text-gray-900 leading-6 focus:bg-transparent",
        label:
          "text-gray-500 transition-all duration-300 ease-in-out origin-[0] peer-focus:-translate-y-3 peer-focus:scale-90 peer-not-placeholder-shown:-translate-y-3 peer-not-placeholder-shown:scale-90 peer-focus:text-sky-600 peer-not-placeholder-shown:text-gray-700",
        description: "text-gray-400",
        errorMessage: "text-red-600",
      }}
      {...props}
      rows={4}
    />
  );
};
