import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export const Payment = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const timeoutRef = useRef<NodeJS.Timeout>();

  const url = location.state?.url;

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

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    if (loadAttempts < 2) {
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

  if (!url) {
    return (
      <div className="inset-0 z-50 bg-white flex items-center justify-center rounded-3xl overflow-hidden">
        <div className="text-center p-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Ошибка</h3>
          <p className="text-gray-500 mb-6">Не удалось получить ссылку на оплату</p>
        </div>
      </div>
    );
  }

  return (
    <div className="z-50 bg-white w-full rounded-3xl overflow-hidden">

      {isLoading && !hasError && (
        <div className="inset-0 flex flex-col items-center justify-center bg-white z-20" style={{ top: '52px', height: 'calc(100% - 52px)' }}>
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Загрузка формы оплаты...</p>
          <p className="mt-1 text-sm text-gray-400">Пожалуйста, подождите</p>
        </div>
      )}

      {hasError && (
        <div className="inset-0 flex flex-col items-center justify-center bg-white z-20 p-6" style={{ top: '52px', height: 'calc(100% - 52px)' }}>
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
      )}

      <iframe
        ref={iframeRef}
        src={url}
        className={`w-full h-[calc(100vh-52px)] border-0 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        title="Payment"
        allow="payment *"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
      />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};