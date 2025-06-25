import React from 'react';
import { videos } from '../data/dummyVideos';
import VideoCard from '../components/VideoCard';

const Home = () => {
  return (
    <div className="container mt-4">
      <div className="row g-4">
        {videos.map(video => (
          <div className="col-md-4" key={video.id}>
            <VideoCard video={video} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
