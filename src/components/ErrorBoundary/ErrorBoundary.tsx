// components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';
import { Typography } from '../Typography';
import { Button } from '@heroui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKey?: unknown; // Сброс при изменении этого ключа
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Обновляем состояние, чтобы следующий рендер показал fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Логируем ошибку в сервис мониторинга
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  componentDidUpdate(prevProps: Props) {
    // Сбрасываем ошибку при изменении resetKey
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false, error: null });
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError && error) {
      if (typeof fallback === 'function') {
        return fallback(error, this.resetError);
      }
      
      if (fallback) {
        return fallback;
      }

      // Дефолтный fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-6 bg-red-50 rounded-lg">
          <Typography type="heading-s" className="text-red-600 mb-2">
            Что-то пошло не так
          </Typography>
          <Typography type="body-s" className="text-gray-600 mb-4 text-center">
            {error.message || 'Произошла непредвиденная ошибка'}
          </Typography>
          <Button
            color="danger"
            variant="light"
            onPress={this.resetError}
          >
            Попробовать снова
          </Button>
        </div>
      );
    }

    return children;
  }
}