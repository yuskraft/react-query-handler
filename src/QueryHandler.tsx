import React from "react";

export interface IQueryResult<T> {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: T;
  error?: Error;
}

export interface IQueryHandlerProps<T> {
  query: IQueryResult<T>;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  children: React.ReactNode;
}

const QueryHandler = <T,>({
  query,
  loadingComponent,
  errorComponent,
  emptyComponent,
  children,
}: IQueryHandlerProps<T>) => {
  const { isLoading, isError, isSuccess, data, error } = query;

  if (isLoading) {
    return loadingComponent || <div>Loading...</div>;
  }

  if (isError) {
    return errorComponent || <div>Error: {error?.message}</div>;
  }

  if (isSuccess && (!data || (Array.isArray(data) && data.length === 0))) {
    return emptyComponent || <div>No Data Found</div>;
  }

  return <>{children}</>;
};

export default QueryHandler;
