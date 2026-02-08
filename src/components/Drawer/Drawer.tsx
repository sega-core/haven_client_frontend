// components/Drawer.tsx
import { Drawer as DrawerVaul } from "vaul";
import { Typography } from "../Typography";
import { useEffect } from "react";

type Props = {
  title?: string;
  mainContent?: React.ReactNode;
  nastedContent?: React.ReactNode;
  drawerMainProps: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  };
  drawerNastedProps?: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  };
};

export const Drawer = ({
  title,
  mainContent,
  nastedContent,
  drawerMainProps,
  drawerNastedProps,
}: Props) => {
  // Синхронизируем состояния
  useEffect(() => {
    if (!drawerMainProps.open && drawerNastedProps?.open) {
      drawerNastedProps.onOpenChange(false);
    }
  }, [drawerMainProps.open, drawerNastedProps]);

  return (
    <>
      {/* Основной дровер */}
      <DrawerVaul.Root 
        open={drawerMainProps.open} 
        onOpenChange={drawerMainProps.onOpenChange}
      >
        <DrawerVaul.Portal>
          <DrawerVaul.Overlay className="fixed inset-0 bg-[#00000099] z-40" />
          <DrawerVaul.Content className="z-50 bg-white-primary rounded-t-4xl flex flex-col fixed bottom-0 left-0 right-0 max-h-[90vh] outline-none">
            {/* Хэндл для драга */}
            <div className="flex justify-center p-2">
              <div className="w-12 h-1.5 rounded-full bg-beige-primary" />
            </div>
            
            <div className="px-4 pb-8 flex-1 overflow-auto">
              {title && (
                <div className="mb-4 text-center">
                  <Typography
                    type="heading-xs"
                    className="text-brown-primary"
                    weight="semibold"
                  >
                    {title}
                  </Typography>
                </div>
              )}
              
              <div className="max-w-md mx-auto">
                {mainContent}
              </div>
            </div>
          </DrawerVaul.Content>
        </DrawerVaul.Portal>
      </DrawerVaul.Root>

      {/* Вложенный дровер (отдельный, не внутри основного) */}
      {drawerNastedProps && (
        <DrawerVaul.Root 
          open={drawerNastedProps.open} 
          onOpenChange={drawerNastedProps.onOpenChange}
        >
          <DrawerVaul.Portal>
            <DrawerVaul.Overlay className="fixed inset-0 bg-[#00000099] z-60" />
            <DrawerVaul.Content className="z-70 bg-white-primary rounded-t-4xl flex flex-col fixed bottom-0 left-0 right-0 max-h-[85vh] outline-none">
              {/* Хэндл для драга */}
              <div className="flex justify-center p-2">
                <div className="w-12 h-1.5 rounded-full bg-beige-primary" />
              </div>
              
              <div className="px-4 pb-8 flex-1 overflow-auto">
                <div className="max-w-md mx-auto">
                  {nastedContent || (
                    <Typography type="body-md" className="text-brown-primary">
                      Вложенный контент
                    </Typography>
                  )}
                </div>
              </div>
            </DrawerVaul.Content>
          </DrawerVaul.Portal>
        </DrawerVaul.Root>
      )}
    </>
  );
};