import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import VideoCard from '../components/VideoCard';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    if (!query) return;

    axios.get(`http://localhost:8000/api/videos/?search=${query}`)
      .then(res => setResults(res.data))
      .catch(err => console.error('Search error:', err));
  }, [query]);

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Search Results for: "{query}"</h4>
      <div className="row g-4">
        {results.length > 0 ? (
          results.map((video) => (
            <div className="col-md-4" key={video.id}>
              <VideoCard video={video} />
            </div>
          ))
        ) : (
          <p>No videos found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
