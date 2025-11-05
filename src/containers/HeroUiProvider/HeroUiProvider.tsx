import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import cn from "../../utils/cn";

export const HeroUiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeroUIProvider>
      <ToastProvider
        placement='bottom-center'
        toastProps={{
          radius: "lg",
          color: "default",
          variant: "solid",
          timeout: 4000,
          hideIcon: true,
          classNames: {
            base: cn("bg-gradient-to-r from-green-500 to-emerald-600 py-6 border-none shadow-lg"),
            title: "text-brown-primary text-md",
          },
        }}
      />
      {children}
    </HeroUIProvider>
  );
};
