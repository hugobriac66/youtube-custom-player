import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setVideoIsNew } from '../store';

function useSetVideoIsNew() {
  const dispatch = useDispatch();
  return useCallback((id, isNew) => {
    dispatch(setVideoIsNew({ id, isNew }));
  }, [dispatch]);
}

export default useSetVideoIsNew;
