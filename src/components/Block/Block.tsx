import cn from "../../utils/cn";

export const Block = ({
  children,
  onClick,
  className = "",
  disabledTransform
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabledTransform?:boolean;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 flex flex-col w-full gap-3 bg-white-primary rounded-3xl cursor-pointer",
        !disabledTransform && "active:scale-95 transition-transform duration-150",
        className,
      )}
    >
      {children}
    </div>
  );
};
