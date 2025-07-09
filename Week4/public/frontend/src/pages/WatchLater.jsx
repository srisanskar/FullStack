import React, { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';

const WatchLater = () => {
  const [savedVideos, setSavedVideos] = useState([]);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem('watchLater')) || [];
    setSavedVideos(data);
  }, []);

  return (
    <div className="container mt-4">
      <h4 className="mb-3">📺 Watch Later</h4>
      {savedVideos.length === 0 ? (
        <p>No videos saved yet.</p>
      ) : (
        <div className="row g-4">
          {savedVideos.map((video) => (
            <div className="col-md-4" key={video.id}>
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchLater;
