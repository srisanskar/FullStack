import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

const Watch = () => {
  const { id } = useParams();
  const location = useLocation();
  const [video, setVideo] = useState(null);
  const [liked, setLiked] = useState(false);
  const [watchLater, setWatchLater] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const { showToast } = useToast();

  const token = sessionStorage.getItem('token');
  const videoURL = `${window.location.origin}${location.pathname}`;

  const fetchVideo = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/videos/${id}/`, {
        headers: token ? { Authorization: `Token ${token}` } : {}
      });
      setVideo(res.data);
      setComments(res.data.comments || []);
      setLiked(res.data.is_liked || false);

      const savedWatchLater = JSON.parse(sessionStorage.getItem('watchLater')) || [];
      setWatchLater(savedWatchLater.some((vid) => vid.id === res.data.id));
    } catch (err) {
      console.error('Failed to fetch video', err);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [id]);

  const toggleLike = async () => {
    if (!token) {
      showToast('🔐 Please sign in to like');
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8000/api/videos/${video.id}/like/`,
        {},
        { headers: { Authorization: `Token ${token}` } }
      );

      setLiked(res.data.liked);
      setVideo(prev => ({
        ...prev,
        like_count: res.data.like_count,
      }));
      showToast(res.data.liked ? '❤️ Liked' : '💔 Unliked');
    } catch (err) {
      console.error('Like error:', err);
      showToast('❌ Failed to like/unlike');
    }
  };

  const toggleWatchLater = () => {
    const watchLaterList = JSON.parse(sessionStorage.getItem('watchLater')) || [];

    if (watchLater) {
      const updated = watchLaterList.filter((vid) => vid.id !== video.id);
      sessionStorage.setItem('watchLater', JSON.stringify(updated));
      showToast('❌ Removed from Watch Later');
    } else {
      watchLaterList.push(video);
      sessionStorage.setItem('watchLater', JSON.stringify(watchLaterList));
      showToast('✅ Added to Watch Later');
    }

    setWatchLater(!watchLater);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    try {
      const res = await axios.post(
        'http://localhost:8000/api/comments/',
        { video: id, text: commentText },
        { headers: { Authorization: `Token ${token}` } }
      );

      setComments([res.data, ...comments]);
      setCommentText('');
      showToast('💬 Comment posted');
    } catch (err) {
      showToast('❌ Failed to post comment');
      console.error('Comment error:', err);
    }
  };

  if (!video) return <div className="text-center">Loading...</div>;

  return (
    <div className="container">
      <h2 className="mb-3">{video.title}</h2>

      <div className="ratio ratio-16x9 mb-3">
        <video
          controls
          className="w-100"
          src={video.video_file.startsWith('http') ? video.video_file : `http://localhost:8000${video.video_file}`}
          poster={video.thumbnail}
        />
      </div>

      <p><strong>Channel:</strong> {video.channel}</p>
      <p><strong>Views:</strong> {video.views}</p>
      <p><strong>Time:</strong> {video.time}</p>
      <p><strong>Likes:</strong> {video.like_count}</p>

      <div className="d-flex gap-2 mb-4">
        <button
          className={`btn ${liked ? 'btn-danger' : 'btn-outline-danger'}`}
          onClick={toggleLike}
        >
          ❤️ {liked ? 'Liked' : 'Like'}
        </button>

        <button
          className={`btn ${watchLater ? 'btn-warning' : 'btn-outline-warning'}`}
          onClick={toggleWatchLater}
        >
          ➕ {watchLater ? 'Saved' : 'Watch Later'}
        </button>

        <button
          className="btn btn-outline-info"
          onClick={() => {
            navigator.clipboard.writeText(videoURL);
            showToast('🔗 Video URL copied!');
          }}
        >
          📤 Share
        </button>
      </div>

      {/* Comment Form */}
      {token ? (
        <form onSubmit={handleCommentSubmit} className="mb-4">
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Add a comment..."
              rows="3"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Post Comment</button>
        </form>
      ) : (
        <p className="text-muted">🔒 Sign in to post comments</p>
      )}

      {/* Comment List */}
      <h5>Comments</h5>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul className="list-group">
          {comments.map((comment) => (
            <li key={comment.id} className="list-group-item">
              <strong>{comment.user}</strong> <span className="text-muted">({new Date(comment.created_at).toLocaleString()})</span>
              <p>{comment.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Watch;
