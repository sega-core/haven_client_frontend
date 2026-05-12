import { HeroUIProvider } from "@heroui/system";

export const HeroUiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  );
};
