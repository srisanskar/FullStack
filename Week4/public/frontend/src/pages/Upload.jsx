import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const Upload = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    channel: '',
    category: 'other', // ✅ default category
  });
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleVideoUpload = (e) => setVideoFile(e.target.files[0]);
  const handleThumbnailUpload = (e) => setThumbnail(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      showToast('⚠️ Please select a video file');
      return;
    }

    const token = sessionStorage.getItem('token');
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('channel', formData.channel);
    data.append('category', formData.category); // ✅ add category
    data.append('video_file', videoFile);
    if (thumbnail) data.append('thumbnail', thumbnail);

    try {
      await axios.post('http://localhost:8000/api/videos/', data, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      showToast('✅ Video uploaded successfully');
      navigate('/');
    } catch (err) {
      console.error(err);
      showToast('❌ Upload failed');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Upload Video</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" name="title" className="form-control" required onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" onChange={handleChange}></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Channel Name</label>
          <input type="text" name="channel" className="form-control" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select name="category" className="form-select" value={formData.category} onChange={handleChange}>
            <option value="music">Music</option>
            <option value="sports">Sports</option>
            <option value="news">News</option>
            <option value="entertainment">Entertainment</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Video File</label>
          <input type="file" accept="video/*" className="form-control" required onChange={handleVideoUpload} />
        </div>

        <div className="mb-3">
          <label className="form-label">Thumbnail</label>
          <input type="file" accept="image/*" className="form-control" onChange={handleThumbnailUpload} />
        </div>

        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
    </div>
  );
};

export default Upload;
