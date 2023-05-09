import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Heading2 from '../components/Heading2';
import useSetVideoIsNew from '../hooks/use-set-video-is-new';

function MainView() {
  const list = useSelector(state => state.list);
  const setVideoIsNew = useSetVideoIsNew();

  const toVideo = video => {
    setVideoIsNew(video.id, false);
  };

  const renderedList = list.videos.map(item => {
    return (
      <div key={item.id} className="mb-5">
        <Link onClick={() => toVideo(item)} to={`/video/${item.id}`}>
          <div className="flex flex-row items-center">
            <img src={item.thumbnailUrl} alt={item.title} className="w-80 lg:w-96" />
            <div className="flex flex-col ml-4">
              <p>{item.title}</p>
              {item.isNew && <div className="bg-blue-500 w-fit mt-2 p-1">NEW</div>}
            </div>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <div className="m-5">
      <Heading2 className="m-3">Videos</Heading2>
      {renderedList}
    </div>
  );
}

export default MainView;

// https://img.youtube.com/vi/Mo4cmTaEDIk/sddefault.jpg
// title, thumbnail_url
