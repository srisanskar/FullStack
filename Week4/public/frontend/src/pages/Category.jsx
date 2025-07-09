// src/pages/Category.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoCard from '../components/VideoCard';

const Category = ({ category }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/videos/?category=${category}`)
      .then((res) => setVideos(res.data))
      .catch((err) => console.error(err));
  }, [category]);

  return (
    <div>
      <h3 className="mb-3">🎵 Music Category</h3>
      <div className="row">
        {videos.map((video) => (
          <div className="col-md-4 mb-4" key={video.id}>
            <VideoCard video={video} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
