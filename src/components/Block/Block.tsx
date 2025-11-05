import { cn } from "@heroui/theme";

export const Block = ({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 flex flex-col w-full gap-3 bg-white-primary rounded-3xl cursor-pointer",
        "active:scale-95 transition-transform duration-150",
        className,
      )}
    >
      {children}
    </div>
  );
};
