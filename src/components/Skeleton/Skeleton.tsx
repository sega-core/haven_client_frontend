export const Skeleton = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`
        bg-beige-tertiary
        animate-pulse 
        rounded-full
        ${className}
      `}
    />
  );
};
