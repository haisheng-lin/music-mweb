import { useState, useCallback } from 'react';

const useAsyncTask = <T extends any[], U>(
  task: (...args: T) => Promise<U>
): [(...args: T) => Promise<U>, boolean, boolean] => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const finalTask = useCallback(
    async (...args: T) => {
      setIsPending(true);
      const result = await task(...args);
      setIsLoaded(true);
      setIsPending(false);
      return result;
    },
    [task]
  );

  return [finalTask, isLoaded, isPending];
};

export default useAsyncTask;
