import { useState, useCallback } from 'react';

export const useDrawer = () => {
  const [mainOpen, setMainOpen] = useState(false);
  const [nestedOpen, setNestedOpen] = useState(false);

  const openMain = useCallback(() => {setMainOpen(true)}, []);
  const closeMain = useCallback(() => setMainOpen(false), []);
  
  const openNested = useCallback(() => setNestedOpen(true), []);
  const closeNested = useCallback(() => setNestedOpen(false), []);

  const closeAll = useCallback(() => {
    setNestedOpen(false);
    setMainOpen(false);
  }, []);

  return {
    mainOpen,
    nestedOpen,
    openMain,
    closeMain,
    openNested,
    closeNested,
    closeAll,
    drawerProps: {
      main: {
        open: mainOpen,
        onOpenChange: setMainOpen,
      },
      nested: {
        open: nestedOpen,
        onOpenChange: setNestedOpen,
      },
    },
  };
};