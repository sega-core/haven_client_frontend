import { useState, useCallback, useEffect } from 'react';

export const useDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [isMobile]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen || isMobile) return;

    const handleOverlayClick = (e: MouseEvent) => {
      const overlay = document.querySelector('[data-vaul-overlay]');
      if (overlay && e.target === overlay) {
        console.log('Desktop overlay click detected');
        close();
      }
    };

    document.addEventListener('click', handleOverlayClick);
    return () => document.removeEventListener('click', handleOverlayClick);
  }, [isOpen, isMobile, close]);

  return {
    isOpen,
    open,
    close,
    drawerProps: {
      open: isOpen,
      onOpenChange: setIsOpen,
    },
  };
};