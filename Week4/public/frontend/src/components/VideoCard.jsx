import React, { useEffect, useState } from 'react';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';

const VideoCard = ({ video }) => {
  const { id, title, channel, views, thumbnail, uploaded_at } = video;
  const [liked, setLiked] = useState(false);
  const [watchLater, setWatchLater] = useState(false);
  const { showToast } = useToast();

  // Theme detection (for dark mode support)
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    setIsDark(document.body.classList.contains('dark-theme'));
  }, []);

  useEffect(() => {
    const likedVideos = JSON.parse(sessionStorage.getItem('liked')) || [];
    const savedWatchLater = JSON.parse(sessionStorage.getItem('watchLater')) || [];

    setLiked(likedVideos.includes(id));
    setWatchLater(savedWatchLater.some((vid) => vid.id === id));
  }, [id]);

  const toggleLike = (e) => {
    e.preventDefault();
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

  const toggleWatchLater = (e) => {
    e.preventDefault();
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
    <Link to={`/watch/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className={`card h-100 shadow-sm ${isDark ? 'bg-dark text-light' : 'bg-white text-dark'}`} style={{ cursor: 'pointer' }}>
        <div className="ratio ratio-16x9 bg-dark">
          <img
            src={thumbnail || 'https://via.placeholder.com/320x180?text=No+Thumbnail'}
            alt={title}
            className="card-img-top object-fit-cover"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="card-body d-flex flex-column">
          <h5 className="card-title mb-1 text-truncate">{title}</h5>
          <small className="mb-1">{channel || 'Unknown Channel'}</small>
          <small className="mb-2 text-muted">{views} views • {format(uploaded_at)}</small>

          <div className="d-flex gap-2 mt-auto">
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
    </Link>
  );
};

export default VideoCard;
