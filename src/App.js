import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { queueVideoIDs } from './store';
import useAddVideo from './hooks/use-add-video';
import Layout from './pages/Layout';
import MainView from './pages/MainView';
import PlayerView from './pages/PlayerView';
import Error404View from './pages/Error404View';

function App() {
  const dispatch = useDispatch();
  const addVideo = useAddVideo();
  const list = useSelector(state => state.list);

  // For DEV purposes only! Remove in production!
  useEffect(() => {
    dispatch(queueVideoIDs(['Mo4cmTaEDIk', 'VqbbrekbL3s', 'KqDX_C0v8_I']));
  }, [dispatch]);

  useEffect(() => {
    if (list.pendingVideoIDs.length > 0 && list.pendingResponses === 0) {
      addVideo(list.pendingVideoIDs[0]);
    }
  }, [addVideo, list]);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MainView />} />
          <Route path='video/:id' element={<PlayerView />} />
          <Route path='*' element={<Error404View />} />
        </Route>
      </Routes>
    </BrowserRouter></>
  );
}

export default App;
