export const Block = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="p-4 flex flex-col w-full gap-3 bg-[var(--background-white-primary)] rounded-3xl cursor-pointer"
    >
      {children}
    </div>
  );
};
