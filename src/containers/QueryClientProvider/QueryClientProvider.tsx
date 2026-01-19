import { QueryClient, QueryClientProvider as QCP } from "@tanstack/react-query";
import { ReactElement, ReactNode } from "react";

interface IQueryClientProviderProps {
  children: ReactNode;
}

export const QueryClientProvider = ({
  children,
}: IQueryClientProviderProps): ReactElement => {
  const queryClient = new QueryClient();

  return <QCP client={queryClient}>{children}</QCP>;
};