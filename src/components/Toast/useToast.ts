import { useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
  duration?: number;
}

export const useToast = () => {
  const showToast = useCallback((message: string, type: ToastType = 'info', options?: ToastOptions) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window.toast) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.toast({ message, type, duration: options?.duration || 5000 });
    } else {
      console.warn('Toast not initialized');
    }
  }, []);

  const success = useCallback((message: string, duration?: number) => {
    showToast(message, 'success', { duration });
  }, [showToast]);

  const error = useCallback((message: string, duration?: number) => {
    showToast(message, 'error', { duration });
  }, [showToast]);

  const info = useCallback((message: string, duration?: number) => {
    showToast(message, 'info', { duration });
  }, [showToast]);

  const warning = useCallback((message: string, duration?: number) => {
    showToast(message, 'warning', { duration });
  }, [showToast]);

  return { showToast, success, error, info, warning };
};