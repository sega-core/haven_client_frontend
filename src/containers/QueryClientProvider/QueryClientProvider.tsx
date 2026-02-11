import { QueryClient, QueryClientProvider as QCP } from "@tanstack/react-query";
import { ReactElement, ReactNode } from "react";

interface IQueryClientProviderProps {
  children: ReactNode;
}

export const QueryClientProvider = ({
  children,
}: IQueryClientProviderProps): ReactElement => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        retry: false,
      },
    },
  });

  return <QCP client={queryClient}>{children}</QCP>;
};
