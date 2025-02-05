import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import BoardContent from './components/BoardContent';
import BoardError from './components/BoardError';
import BoardLoading from './components/BoardLoading';

function BoardExample() {
  return (
    <ErrorBoundary FallbackComponent={BoardError}>
      <Suspense fallback={<BoardLoading />}>
        <BoardContent />
      </Suspense>
    </ErrorBoundary>
  );
}

export default BoardExample;
