// contexts/DrawerContext.tsx
import { createContext, useContext, useState, useCallback } from "react";
import { Drawer as DrawerComponent } from "./Drawer";

interface DrawerContent {
  id: string;
  title?: string | React.ReactNode;
  content: React.ReactNode;
  isNasted?: boolean;
  onCloseCallback?: () => void;
  isClosing?: boolean;
}

interface DrawerContextType {
  openDrawer: (config: Omit<DrawerContent, "id" | "isClosing">) => void;
  closeDrawer: () => void;
  closeNestedDrawer: () => void;
  updateDrawerTitle: (title: string | React.ReactNode) => void;
  drawerStack: DrawerContent[];
}

const DrawerContext = createContext<DrawerContextType | null>(null);

export const DrawerProvider = ({ children }: { children: React.ReactNode }) => {
  const [drawerStack, setDrawerStack] = useState<DrawerContent[]>([]);

  const generateId = () =>
    `drawer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const openDrawer = useCallback(
    (config: Omit<DrawerContent, "id" | "isClosing">) => {
      const newDrawer: DrawerContent = {
        ...config,
        id: generateId(),
        isClosing: false,
      };

      if (config.isNasted) {
        setDrawerStack((prev) => [...prev, newDrawer]);
      } else {
        setDrawerStack([newDrawer]);
      }
    },
    [],
  );

  const closeDrawer = useCallback(() => {
    setDrawerStack((prev) => {
      if (prev.length === 0) return prev;

      const updatedStack = prev.map((drawer) => ({
        ...drawer,
        isClosing: true,
      }));

      setTimeout(() => {
        setDrawerStack([]);
      }, 300);

      return updatedStack;
    });
  }, []);

  const closeNestedDrawer = useCallback(() => {
    if (drawerStack.length <= 1) {
      closeDrawer();
      return;
    }

    const lastDrawer = drawerStack[drawerStack.length - 1];

    // Помечаем только верхний Drawer как закрывающийся
    setDrawerStack((prev) => {
      const newStack = [...prev];
      newStack[newStack.length - 1] = { ...lastDrawer, isClosing: true };
      return newStack;
    });

    // Ждём анимацию и удаляем
    setTimeout(() => {
      setDrawerStack((prev) => prev.slice(0, -1));
    }, 300);
  }, [drawerStack, closeDrawer]);

  const updateDrawerTitle = useCallback((title: string | React.ReactNode) => {
    setDrawerStack((prev) => {
      if (prev.length === 0) return prev;
      const newStack = [...prev];
      newStack[newStack.length - 1] = {
        ...newStack[newStack.length - 1],
        title,
      };
      return newStack;
    });
  }, []);

  return (
    <DrawerContext.Provider
      value={{
        openDrawer,
        closeDrawer,
        closeNestedDrawer,
        updateDrawerTitle,
        drawerStack,
      }}
    >
      {children}
      {drawerStack.map((drawer, index) => {
        return (
          <DrawerComponent
            key={drawer.id}
            title={drawer.title}
            open={!drawer.isClosing}
            onClose={index === 0 ? closeDrawer : closeNestedDrawer}
            isNasted={index > 0}
          >
            {drawer.content}
          </DrawerComponent>
        );
      })}
    </DrawerContext.Provider>
  );
};

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer must be used within DrawerProvider");
  }
  return context;
};
