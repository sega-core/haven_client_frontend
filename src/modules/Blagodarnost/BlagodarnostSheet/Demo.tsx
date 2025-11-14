import { Sheet, SheetRef } from "react-modal-sheet";
import { useState, useRef } from "react";
import { Typography } from "../../../components/Typography";
import { Icon } from "../../../components/Icon";

const snapPoints = [0, 0.5, 1];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
};

export const Demo = ({ isOpen, onClose, title, children }: Props) => {
  const ref = useRef<SheetRef>(null);
  const snapTo = (i: number) => ref.current?.snapTo(i);

  return (
    <>
      {/* Opens to 50% since initial index is 1 */}
      <Sheet
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        initialSnap={1}
        snapPoints={snapPoints}
        onSnap={(snapIndex) =>
          console.log("> Current snap point index:", snapIndex)
        }
      >
        <Sheet.Container>
          <Sheet.Header className="bg-(--background-white-primary)">
            <div className="relative flex items-center justify-center w-full p-4">
              <Typography type="heading-xs" className="text-center w-full">
                {title}
              </Typography>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => snapTo(1)}
              >
                <Icon name="Close" width={24} height={24} />
              </button>
            </div>
          </Sheet.Header>
          <Sheet.Content>{children}</Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
};
