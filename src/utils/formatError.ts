export const formatError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (error && typeof error === 'object') {
    if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }
    if ('error' in error && typeof error.error === 'string') {
      return error.error;
    }
    if ('data' in error && error.data && typeof error.data === 'object') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = error.data as any;
      if (data.message) return data.message;
      if (data.error) return data.error;
    }
    
    try {
      return JSON.stringify(error, null, 2);
    } catch {
      return 'Неизвестная ошибка';
    }
  }
  
  return 'Произошла неизвестная ошибка';
};