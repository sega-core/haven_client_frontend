// RobokassaIframe.tsx
import React, { useState, useRef, useEffect } from 'react';

interface RobokassaIframeProps {
  url: string;
  onSuccess?: () => void;
  onFail?: () => void;
  onClose?: () => void;
  height?: string;
}

export const PaymentComponent: React.FC<RobokassaIframeProps> = ({ 
  url, 
  onSuccess, 
  onFail, 
  onClose,
  height = '600px'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (isLoading) {
        setHasError(true);
        setIsLoading(false);
      }
    }, 15000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isLoading]);

  // Обработка сообщений от Robokassa
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Проверяем origin для безопасности
      const allowedOrigins = [
        'https://auth.robokassa.ru',
        'https://robokassa.ru',
        'https://www.robokassa.ru'
      ];
      
      if (allowedOrigins.some(origin => event.origin.startsWith(origin))) {
        // Проверяем статус оплаты
        if (event.data?.type === 'paymentSuccess' || event.data?.Success === true) {
          onSuccess?.();
        } else if (event.data?.type === 'paymentFail' || event.data?.Fail === true) {
          onFail?.();
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onSuccess, onFail]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    if (loadAttempts < 2) {
      // Попробуем перезагрузить iframe
      setLoadAttempts(prev => prev + 1);
      setIsLoading(true);
      setHasError(false);
      
      if (iframeRef.current) {
        iframeRef.current.src = url;
      }
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setLoadAttempts(0);
    setIsLoading(true);
    setHasError(false);
    
    if (iframeRef.current) {
      iframeRef.current.src = url;
    }
  };

  // Компонент лоадера
  const Loader = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
      <div className="relative">
        {/* Анимированный спиннер */}
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">Загрузка формы оплаты...</p>
      <p className="mt-1 text-sm text-gray-400">Пожалуйста, подождите</p>
    </div>
  );

  // Компонент ошибки
  const ErrorDisplay = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 p-6">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Ошибка загрузки</h3>
      <p className="text-gray-500 text-center mb-6">
        Не удалось загрузить страницу оплаты.<br />
        Проверьте соединение с интернетом и попробуйте снова.
      </p>
      <button
        onClick={handleRetry}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-200"
      >
        Попробовать снова
      </button>
    </div>
  );

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white">
      {/* Iframe с атрибутами безопасности */}
      <iframe
        ref={iframeRef}
        src={url}
        className={`w-full transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{ height }}
        title="Оплата через Robokassa"
        allow="payment *; clipboard-read; clipboard-write"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
        onLoad={handleLoad}
        onError={handleError}
      />

      {/* Лоадер */}
      {isLoading && !hasError && <Loader />}
      
      {/* Ошибка */}
      {hasError && <ErrorDisplay />}

      {/* Кнопка закрытия (опционально) */}
      {onClose && !isLoading && !hasError && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 bg-white/80 hover:bg-white rounded-full shadow-md transition-all z-20"
          aria-label="Закрыть"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};