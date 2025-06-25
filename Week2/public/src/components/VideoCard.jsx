import React, { useEffect, useState } from 'react';
import { useToast } from '../context/ToastContext';

const VideoCard = ({ video }) => {
  const { id, title, channel, views, time, thumbnail } = video;
  const [liked, setLiked] = useState(false);
  const [watchLater, setWatchLater] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const likedVideos = JSON.parse(sessionStorage.getItem('liked')) || [];
    const savedWatchLater = JSON.parse(sessionStorage.getItem('watchLater')) || [];

    setLiked(likedVideos.includes(id));
    setWatchLater(savedWatchLater.some((vid) => vid.id === id));
  }, [id]);

  const toggleLike = () => {
    const likedVideos = JSON.parse(sessionStorage.getItem('liked')) || [];

    if (liked) {
      const updated = likedVideos.filter((vid) => vid !== id);
      sessionStorage.setItem('liked', JSON.stringify(updated));
      showToast('💔 Unliked');
    } else {
      likedVideos.push(id);
      sessionStorage.setItem('liked', JSON.stringify(likedVideos));
      showToast('❤️ Liked!');
    }

    setLiked(!liked);
  };

  const toggleWatchLater = () => {
    const watchLaterList = JSON.parse(sessionStorage.getItem('watchLater')) || [];

    if (watchLater) {
      const updated = watchLaterList.filter((vid) => vid.id !== id);
      sessionStorage.setItem('watchLater', JSON.stringify(updated));
      showToast('❌ Removed from Watch Later');
    } else {
      watchLaterList.push(video);
      sessionStorage.setItem('watchLater', JSON.stringify(watchLaterList));
      showToast('✅ Added to Watch Later');
    }

    setWatchLater(!watchLater);
  };

  return (
    <div className="card h-100 shadow-sm">
      <img src={thumbnail} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{channel}</h6>
        <p className="card-text">{views} • {time}</p>
        <div className="d-flex gap-2">
          <button
            className={`btn btn-sm ${liked ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={toggleLike}
          >
            ❤️ {liked ? 'Liked' : 'Like'}
          </button>
          <button
            className={`btn btn-sm ${watchLater ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={toggleWatchLater}
          >
            ➕ {watchLater ? 'Saved' : 'Watch Later'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
