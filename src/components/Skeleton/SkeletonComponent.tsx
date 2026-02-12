export const SkeletonComponent = ({ className = "" }: { className?: string }) => {
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
