// components/DrawerDesktopFix.tsx
import { Drawer as VaulDrawer } from "vaul";
import { Typography } from "../Typography";
import { forwardRef } from "react";
import cn from "../../utils/cn";

interface DrawerProps {
  title?: string | React.ReactNode;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  isNasted?: boolean;
  className?: string;
}

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  ({ title, children, open, onClose, isNasted, className }) => {
    const DrawerComponent = isNasted ? VaulDrawer.NestedRoot : VaulDrawer.Root;

    return (
      <DrawerComponent
        repositionInputs={false}
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) onClose();
        }}
      >
        <VaulDrawer.Portal>
          <VaulDrawer.Overlay
            className={cn(
              "fixed inset-0 bg-[#00000099]",
              `${!isNasted ? "z-40" : "z-42"}`,
            )}
          />

          <VaulDrawer.Content
            className={cn(
              "bg-white-primary rounded-t-4xl flex flex-col fixed bottom-0 left-0 right-0 max-h-[90vh] outline-none",
              className,
              `${!isNasted ? "z-41" : "z-43"}`,
            )}
          >
            <div className="flex justify-center p-2">
              <div className="w-12 h-1.5 rounded-full bg-beige-primary" />
            </div>
            <div
              className={cn(
                "p-4 flex-1 overflow-auto gap-4 flex flex-col pt-6",
              )}
            >
              {title && (
                <Typography
                  type="heading-xs"
                  className="text-brown-primary text-center"
                  weight="semibold"
                >
                  {title}
                </Typography>
              )}
              <div>{children}</div>
            </div>
          </VaulDrawer.Content>
        </VaulDrawer.Portal>
      </DrawerComponent>
    );
  },
);

Drawer.displayName = "Drawer";
