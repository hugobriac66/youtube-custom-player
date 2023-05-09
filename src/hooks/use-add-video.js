import { useCallback } from 'react';
import useThunk from './use-thunk';
import { fetchVideoInfo } from '../store';

function useAddVideo() {
  const [doFetchVideoInfo] = useThunk(fetchVideoInfo);
  return useCallback(id => {
    doFetchVideoInfo(id);
  }, [doFetchVideoInfo]);
}

export default useAddVideo;
