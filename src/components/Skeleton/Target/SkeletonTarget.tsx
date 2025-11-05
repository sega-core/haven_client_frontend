import { ReactNode } from "react";
import { Block } from "../../Block";
import { SkeletonComponent } from "../SkeletonComponent";

export const SkeletonTarget = ({
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
      {Array.from({ length: 2 }).map((_, index) => (
        <Block key={index}>
          <SkeletonComponent className="h-6" />
          <SkeletonComponent className="h-6" />
          <SkeletonComponent className="h-6" />
          <SkeletonComponent className="h-20" />
        </Block>
      ))}
    </div>
  );
};
