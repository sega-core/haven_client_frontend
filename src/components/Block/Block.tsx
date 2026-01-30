export const Block = ({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 flex flex-col w-full gap-3 
      bg-white-primary rounded-3xl cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
};
