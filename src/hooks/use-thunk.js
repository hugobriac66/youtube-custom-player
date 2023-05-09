import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

function useThunk(thunk) {
  const [isWaiting, setIsWaiting] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const runThunk = useCallback((arg) => {
    setIsWaiting(true);
    dispatch(thunk(arg))
      .unwrap()
      .catch(err => setError(err))
      .finally(() => setIsWaiting(false));
  }, [dispatch, thunk]);

  return [runThunk, isWaiting, error];
}

export default useThunk;
