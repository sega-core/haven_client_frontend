// components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from "react";
import { Typography } from "../Typography";
import { Button } from "@heroui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKey?: unknown;
}

interface State {
  hasError: boolean;
  error: Error | null;
  copied: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      copied: false,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, copied:false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false, error: null });
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  copyError = async () => {
    const { error } = this.state;
    if (!error) return;

    try {
      await navigator.clipboard.writeText(
        `${error.name}: ${error.message}\n\n${error.stack ?? ""}`,
      );
      this.setState({ copied: true });

      setTimeout(() => {
        this.setState({ copied: false });
      }, 2000);
    } catch (e) {
      console.error("Failed to copy error:", e);
    }
  };

  render() {
    const { hasError, error, copied } = this.state;
    const { children, fallback } = this.props;

    if (hasError && error) {
      if (typeof fallback === "function") {
        return fallback(error, this.resetError);
      }

      if (fallback) {
        return fallback;
      }

      return (
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="w-full max-w-md text-center bg-white shadow-lg rounded-2xl p-8 border border-red-100">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-2xl">
                😅
              </div>
            </div>

            <Typography type="heading-s" className="text-red-600 mb-2">
              Что-то пошло не так
            </Typography>

            <Typography
              type="body-s"
              className="text-gray-500 mb-6 break-words"
            >
              {error.message || "Произошла непредвиденная ошибка"}
            </Typography>

            <Button
              color="danger"
              variant="solid"
              onPress={this.resetError}
              className="w-full"
            >
              Попробовать снова
            </Button>
            <Button
                variant="bordered"
                onPress={this.copyError}
                className="w-full mt-2"
              >
                {copied ? 'Скопировано ✓' : 'Скопировать ошибку'}
              </Button>
          </div>
        </div>
      );
    }

    return children;
  }
}
