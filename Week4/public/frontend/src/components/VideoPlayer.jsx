// src/components/VideoPlayer.jsx
import React from 'react';
import ReactPlayer from 'react-player';
import { format } from 'timeago.js';

const VideoPlayer = ({ url, created_at }) => {
  return (
    <div className="player-wrapper" style={{ maxWidth: '100%', marginBottom: '1rem' }}>
      <ReactPlayer
        url={url}
        controls
        width="100%"
        height="400px"
      />
      <p className="mt-2 text-muted">Uploaded: {format(created_at)}</p>
    </div>
  );
};

export default VideoPlayer;
