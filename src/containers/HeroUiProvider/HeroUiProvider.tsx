import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";

export const HeroUiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeroUIProvider>
      <ToastProvider placement="bottom-center" />
      {children}
    </HeroUIProvider>
  );
};
