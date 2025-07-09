import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const { showToast } = useToast();
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchMyVideos = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/my-videos/', {
          headers: { Authorization: `Token ${token}` },
        });
        setVideos(res.data);
      } catch (err) {
        console.error('Failed to fetch my videos:', err);
        showToast('❌ Failed to load your videos');
      }
    };

    if (token) fetchMyVideos();
  }, [token, showToast]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📺 Your Uploaded Videos</h2>
      {videos.length === 0 ? (
        <p>No videos uploaded yet.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {videos.map((video) => (
            <div key={video.id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="ratio ratio-16x9 bg-dark">
                  <img
                    src={video.thumbnail || 'https://via.placeholder.com/320x180?text=No+Thumbnail'}
                    className="card-img-top object-fit-cover"
                    alt={video.title}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate">{video.title}</h5>
                  <p className="text-muted mb-1">Category: {video.category}</p>
                  <p className="text-muted mb-1">Views: {video.views} • Time: {video.time}</p>
                  <Link to={`/watch/${video.id}`} className="btn btn-sm btn-primary mt-auto">▶️ Watch</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
