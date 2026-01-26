import { ReactNode } from "react";
import { Block } from "../Block";
import { Skeleton } from "./Skeleton";

export const SkeletonMain = ({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: ReactNode;
}) => {
  if (!isLoading) {
    return children;
  }
  return (
    <div className="grid gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Block key={index}>
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
        </Block>
      ))}
    </div>
  );
};
