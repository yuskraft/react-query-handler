# react-query-handler

A flexible React component and hook for handling async query states with customizable loading, error, and empty states.

## Installation

```bash
npm install react-query-handler
# or
yarn add react-query-handler
```

## Features

- 🎯 Simple component and hook-based API
- 🎨 Customizable loading, error, and empty states
- 🔄 Compatible with any async data fetching solution
- ⚙️ Global default components via context
- 🎁 TypeScript support out of the box

## Usage

### Basic Component Usage

```tsx
import { QueryHandler } from 'react-query-handler';

function MyComponent() {
  const query = useQuery('todos', fetchTodos);

  return (
    <QueryHandler query={query}>
      {/* Your content here */}
      {query.data.map(todo => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </QueryHandler>
  );
}
```

### Hook Usage

```tsx
import { useQueryHandler } from 'react-query-handler';

function MyComponent() {
  const query = useQuery('todos', fetchTodos);
  const content = useQueryHandler(query);

  // If in loading/error/empty state, appropriate component will be returned
  // Otherwise, content will contain your data
  return <div>{content}</div>;
}
```

### Custom Components

```tsx
function MyComponent() {
  return (
    <QueryHandler
      query={query}
      loadingComponent={<CustomSpinner />}
      errorComponent={<CustomError />}
      emptyComponent={<CustomEmpty />}
    >
      {/* Your content here */}
    </QueryHandler>
  );
}
```

### Global Defaults

```tsx
import { QueryHandlerProvider } from 'react-query-handler';

const config = {
  defaultLoadingComponent: <CustomSpinner />,
  defaultErrorComponent: <CustomError />,
  defaultEmptyComponent: <CustomEmpty />
};

function App() {
  return (
    <QueryHandlerProvider config={config}>
      {/* Your app content */}
    </QueryHandlerProvider>
  );
}
```

## API Reference

### QueryHandler Component

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `query` | `IQueryResult<T>` | Query result object containing loading/error states and data |
| `loadingComponent` | `ReactNode` | Optional custom loading component |
| `errorComponent` | `ReactNode` | Optional custom error component |
| `emptyComponent` | `ReactNode` | Optional custom empty state component |
| `children` | `ReactNode` | Content to render when query is successful |

### useQueryHandler Hook

```tsx
const content = useQueryHandler(query, {
  loadingComponent,
  errorComponent,
  emptyComponent
});
```

Returns appropriate component based on query state or the data if query is successful.

### QueryHandlerProvider

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `config` | `IQueryHandlerConfig` | Configuration object for default components |
| `children` | `ReactNode` | Child components |

### Types

```typescript
interface IQueryResult<T> {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: T;
  error?: Error;
}

interface IQueryHandlerConfig {
  defaultLoadingComponent?: ReactNode;
  defaultErrorComponent?: ReactNode;
  defaultEmptyComponent?: ReactNode;
}
```

## Compatibility

Works with any data fetching solution that provides loading, error, and success states (React Query, SWR, Apollo, etc.).

## License

MIT