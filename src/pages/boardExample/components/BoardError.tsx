import { FallbackProps } from 'react-error-boundary';

const BoardError = ({ error }: FallbackProps) => {
  return (
    <div>
      <h2>에러가 발생했습니다</h2>
      <p>{error.message || '알 수 없는 에러가 발생했습니다'}</p>
    </div>
  );
};

export default BoardError;
