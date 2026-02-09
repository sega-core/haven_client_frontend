// components/DrawerDesktopFix.tsx
import { Drawer as VaulDrawer } from "vaul";
import { Typography } from "../Typography";
import { useEffect, useRef } from "react";
import cn from "../../utils/cn";

type Props = {
  title?: string;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  isNasted?: boolean;
};

export const Drawer = ({ title, children, open, onClose, isNasted }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    if (!open || isMobile) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node)
      ) {
        console.log("Click outside detected, closing drawer");
        onClose();
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open, isMobile, onClose]);

  const DrawerComponent = isNasted ? VaulDrawer.NestedRoot : VaulDrawer.Root;

  return (
    <DrawerComponent
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      shouldScaleBackground={isMobile}
      dismissible={isMobile}
    >
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay
          className={cn(
            "fixed inset-0 bg-[#00000099]",
            `${!isNasted ? "z-40" : "z-42"}`,
          )}
        />

        <VaulDrawer.Content
          ref={contentRef}
          className={cn(
            "bg-white-primary rounded-t-4xl flex flex-col fixed bottom-0 left-0 right-0 max-h-[90vh] outline-none",
            `${!isNasted ? "z-41" : "z-43"}`,
          )}
          onPointerDownOutside={(e) => {
            if (!isMobile) {
              e.preventDefault();
            }
          }}
        >
          {isMobile && (
            <div className="flex justify-center p-2">
              <div className="w-12 h-1.5 rounded-full bg-beige-primary" />
            </div>
          )}

          <div
            className={`px-4 pb-6 flex-1 overflow-auto gap-4 flex flex-col ${!isMobile ? "pt-6" : ""}`}
          >
           <Typography
                type="heading-xs"
                className="text-brown-primary text-center"
                weight="semibold"
              >
                {title}
              </Typography>
            <div className="max-w-md mx-auto">{children}</div>
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </DrawerComponent>
  );
};
