import React, { createContext, useContext, ReactNode } from "react";

export interface IQueryResult<T> {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: T;
  error?: Error;
}

export interface IQueryHandlerProps<T> {
  query?: IQueryResult<T>;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
  emptyComponent?: ReactNode;
  children: ReactNode;
}

export interface IQueryHandlerConfig {
  defaultLoadingComponent?: ReactNode;
  defaultErrorComponent?: ReactNode;
  defaultEmptyComponent?: ReactNode;
}

const QueryHandlerContext = createContext<IQueryHandlerConfig>({});

export const QueryHandlerProvider: React.FC<{
  config: IQueryHandlerConfig;
  children: ReactNode;
}> = ({ config, children }) => {
  return (
    <QueryHandlerContext.Provider value={config}>
      {children}
    </QueryHandlerContext.Provider>
  );
};

const QueryHandler = <T,>({
  query,
  loadingComponent,
  errorComponent,
  emptyComponent,
  children,
}: IQueryHandlerProps<T>) => {
  const {
    defaultLoadingComponent,
    defaultErrorComponent,
    defaultEmptyComponent,
  } = useContext(QueryHandlerContext);
  const { isLoading, isError, isSuccess, data, error } = query || {};

  if (isLoading) {
    return loadingComponent || defaultLoadingComponent || <div>Loading...</div>;
  }

  if (isError) {
    return (
      errorComponent ||
      defaultErrorComponent || <div>Error: {error?.message}</div>
    );
  }

  if (isSuccess && (!data || (Array.isArray(data) && data.length === 0))) {
    return emptyComponent || defaultEmptyComponent || <div>No Data Found</div>;
  }

  return <>{children}</>;
};

export const useQueryHandler = <T,>(
  query?: IQueryResult<T>,
  components?: {
    loadingComponent?: ReactNode;
    errorComponent?: ReactNode;
    emptyComponent?: ReactNode;
  }
): ReactNode | T | undefined => {
  const { isLoading, isError, isSuccess, data, error } = query || {};
  const {
    defaultLoadingComponent,
    defaultErrorComponent,
    defaultEmptyComponent,
  } = useContext(QueryHandlerContext);

  if (isLoading) {
    return (
      components?.loadingComponent ||
      defaultLoadingComponent || <div>Loading...</div>
    );
  }

  if (isError) {
    return (
      components?.errorComponent ||
      defaultErrorComponent || <div>Error: {error?.message}</div>
    );
  }

  if (isSuccess && (!data || (Array.isArray(data) && data.length === 0))) {
    return (
      components?.emptyComponent ||
      defaultEmptyComponent || <div>No Data Found</div>
    );
  }

  return data;
};

export const useQueryHandlerConfig = () => {
  const context = useContext(QueryHandlerContext);
  if (context === undefined) {
    throw new Error(
      "useQueryHandlerConfig must be used within a QueryHandlerProvider"
    );
  }
  return context;
};

export default QueryHandler;
