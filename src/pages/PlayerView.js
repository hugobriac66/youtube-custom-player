import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoHome, IoPlaySharp, IoPauseSharp, IoVolumeHighSharp, IoVolumeMuteSharp } from 'react-icons/io5';
import Button from '../components/Button';
import PlaybackControlButton from '../components/PlaybackControlButton';

let timeoutID = -1;

function PlayerView() {
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  const list = useSelector(state => state.list);
  const video = list.videos.find(video => video.id === id);

  let renderedContent = null;

  const onPlayerReady = event => {
    setPlayer(event.target);
  };

  const updateProgressBar = useCallback(delay => {
    timeoutID = setTimeout(() => updateProgressBar(delay), delay);
    if (player) {
      setProgress(progress => progress + delay / 1000 / player.getDuration());
    }
  }, [player]);

  const onPlayerStateChange = useCallback(playerStatus => {
    clearTimeout(timeoutID);
    setProgress(playerStatus.target.playerInfo.currentTime / playerStatus.target.playerInfo.duration);
    if (playerStatus.data === 1) {
      setIsPlaying(true);
      timeoutID = setTimeout(() => updateProgressBar(50), 50);
    } else {
      setIsPlaying(false);
      if (playerStatus.data === 0) {
        setProgress(1);
      }
    }
  }, [updateProgressBar]);

  useEffect(() => {
    if (video) {
      new window.YT.Player('iframe-player', {
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    }
  }, [video, onPlayerStateChange]);

  const play = willPlay => {
    if (willPlay) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }
    
  };

  const mute = willMute => {
    if (willMute) {
      player.mute();
    } else {
      player.unMute();
    }
    setIsMuted(willMute);
  };

  const onChangeProgress = event => {
    const progress = event.target.value;
    setProgress(progress);
    player.seekTo(player.getDuration() * progress);
  };

  const onBack = () => {
    navigate('/');
  };

  if (video) {
    renderedContent = (
      <div className="relative w-screen h-screen">
        <iframe id="iframe-player" className="w-full h-full" title={video.title}
          src={`https://www.youtube.com/embed/${id}?controls=0&disablekb=1&enablejsapi=1&autoplay=1`}
        ></iframe>
        <div className="absolute inset-x-0 bottom-0 bg-black flex flex-row justify-between items-center text-black font-bold">
          {isPlaying ? <PlaybackControlButton onClick={() => play(false)}><IoPauseSharp /></PlaybackControlButton> : <PlaybackControlButton onClick={() => play(true)}><IoPlaySharp /></PlaybackControlButton>}
          <input type="range" min="0" max="1" step="0.001" className="w-full" value={progress} onChange={onChangeProgress} />
          {isMuted ? <PlaybackControlButton onClick={() => mute(false)}><IoVolumeMuteSharp /></PlaybackControlButton> : <PlaybackControlButton onClick={() => mute(true)}><IoVolumeHighSharp /></PlaybackControlButton>}
          <div className="bg-blue-500 mr-3 p-2 cursor-pointer rounded-md shrink-0" onClick={onBack}>BACK TO HOME</div>
        </div>
      </div>
    );
  } else {
    renderedContent = (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-3xl mb-8">The video does not exist.</p>
        <Link to="/"><Button secondary className="text-xl px-6 py-5"><IoHome className="mr-2" />Back</Button></Link>
      </div>
    );
  }

  return (
    <div>{renderedContent}</div>
  );
};

export default PlayerView;
