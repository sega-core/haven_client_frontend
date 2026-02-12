// components/DrawerDesktopFix.tsx
import { Drawer as VaulDrawer } from "vaul";
import { Typography } from "../Typography";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
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
  ({ title, children, open, onClose, isNasted, className }, ref) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Прокидываем ref наружу
    useImperativeHandle(ref, () => contentRef.current as HTMLDivElement);

    useEffect(() => {
      if (!open || isMobile) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(e.target as Node)
        ) {
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
        onOpenChange={(isOpen) => {
          if (!isOpen) onClose();
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
              className,
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
              className={cn(
                "p-4 flex-1 overflow-auto gap-4 flex flex-col",
                !isMobile ? "pt-6" : "",
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
  }
);

Drawer.displayName = "Drawer";