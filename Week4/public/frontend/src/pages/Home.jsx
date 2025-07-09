// src/pages/Home.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoCard from '../components/VideoCard';

const Home = ({ search }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8000/api/videos/?search=${encodeURIComponent(search)}`);
      setVideos(res.data);
    } catch (err) {
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchVideos();
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [search]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4 fw-bold">📺 Latest Uploads</h3>

      {loading ? (
        <div className="text-center">Loading videos...</div>
      ) : (
        <div className="row g-4">
          {videos.length > 0 ? (
            videos.map(video => (
              <div className="col-md-4" key={video.id}>
                <VideoCard video={video} />
              </div>
            ))
          ) : (
            <div className="text-center">No videos found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
