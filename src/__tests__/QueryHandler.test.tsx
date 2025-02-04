import React, { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import QueryHandler, {
  QueryHandlerProvider,
  useQueryHandler,
} from "../QueryHandler";

describe("QueryHandler Component", () => {
  it("renders loading component when isLoading is true", () => {
    render(
      <QueryHandler
        query={{ isLoading: true, isError: false, isSuccess: false }}
      >
        <div>Data Loaded</div>
      </QueryHandler>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error component when isError is true", () => {
    render(
      <QueryHandler
        query={{
          isLoading: false,
          isError: true,
          error: new Error("Test Error"),
          isSuccess: false,
        }}
      >
        <div>Data Loaded</div>
      </QueryHandler>
    );
    expect(screen.getByText("Error: Test Error")).toBeInTheDocument();
  });

  it("renders empty component when data is empty", () => {
    render(
      <QueryHandler
        query={{ isLoading: false, isError: false, isSuccess: true, data: [] }}
      >
        <div>Data Loaded</div>
      </QueryHandler>
    );
    expect(screen.getByText("No Data Found")).toBeInTheDocument();
  });

  it("renders children when data is available", () => {
    render(
      <QueryHandler
        query={{
          isLoading: false,
          isError: false,
          isSuccess: true,
          data: ["Item 1"],
        }}
      >
        <div>Data Loaded</div>
      </QueryHandler>
    );
    expect(screen.getByText("Data Loaded")).toBeInTheDocument();
  });
});

describe("useQueryHandler Hook", () => {
  const TestComponent = ({ query }: { query: any }) => {
    const result: ReactNode = useQueryHandler(query);
    return <div>{result}</div>;
  };

  it("returns loading component when isLoading is true", () => {
    render(
      <QueryHandlerProvider config={{}}>
        <TestComponent
          query={{ isLoading: true, isError: false, isSuccess: false }}
        />
      </QueryHandlerProvider>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("returns error component when isError is true", () => {
    render(
      <QueryHandlerProvider config={{}}>
        <TestComponent
          query={{
            isLoading: false,
            isError: true,
            error: new Error("Test Error"),
            isSuccess: false,
          }}
        />
      </QueryHandlerProvider>
    );
    expect(screen.getByText("Error: Test Error")).toBeInTheDocument();
  });

  it("returns empty component when data is empty", () => {
    render(
      <QueryHandlerProvider config={{}}>
        <TestComponent
          query={{
            isLoading: false,
            isError: false,
            isSuccess: true,
            data: [],
          }}
        />
      </QueryHandlerProvider>
    );
    expect(screen.getByText("No Data Found")).toBeInTheDocument();
  });

  it("returns data when available", () => {
    render(
      <QueryHandlerProvider config={{}}>
        <TestComponent
          query={{
            isLoading: false,
            isError: false,
            isSuccess: true,
            data: "Data Loaded",
          }}
        />
      </QueryHandlerProvider>
    );
    expect(screen.getByText("Data Loaded")).toBeInTheDocument();
  });
});
