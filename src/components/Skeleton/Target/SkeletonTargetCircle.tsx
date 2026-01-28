import { ReactNode } from "react";
import { Block } from "../../Block";
import { SkeletonComponent } from "../SkeletonComponent";

export const SkeletonTargetCircle = ({
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
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <Block className="max-w-[170px] h-[170px]" key={index}>
          <SkeletonComponent className="w-10 h-10"/>
          <SkeletonComponent className="h-3"/>
          <SkeletonComponent className="h-3"/>
        </Block>
      ))}
    </>
  );
};
