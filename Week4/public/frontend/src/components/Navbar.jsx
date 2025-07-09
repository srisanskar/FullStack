// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Timer from './Timer';
import '../styles/NavbarSearch.css';

const Navbar = ({ search, setSearch }) => {
  const [watchLaterCount, setWatchLaterCount] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [allTitles, setAllTitles] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const storedWatchLater = JSON.parse(sessionStorage.getItem('watchLater')) || [];
    setWatchLaterCount(storedWatchLater.length);
  }, [location]);

  useEffect(() => {
    const storedTheme = sessionStorage.getItem('theme');
    if (storedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const body = document.body;
    if (isDark) {
      body.classList.remove('dark-theme');
      sessionStorage.setItem('theme', 'light');
    } else {
      body.classList.add('dark-theme');
      sessionStorage.setItem('theme', 'dark');
    }
    setIsDark(!isDark);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:8000/api/logout/',
        {},
        { headers: { Authorization: `Token ${token}` } }
      );
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      sessionStorage.removeItem('token');
      navigate('/');
    }
  };

  // 🔽 Autocomplete logic
  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/videos/');
        setAllTitles(res.data.map(video => video.title));
      } catch (err) {
        console.error('Autocomplete fetch error:', err);
      }
    };
    fetchTitles();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
    } else {
      const matches = allTitles.filter(title =>
        title.toLowerCase().includes(search.toLowerCase())
      );
      setSuggestions(matches.slice(0, 5));
    }
  }, [search, allTitles]);

  return (
    <>
      <nav className={`navbar navbar-expand-lg px-4 ${isDark ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
        <Link className="navbar-brand fw-bold text-primary" to="/">
          MiniTube 🎬
        </Link>

        <div className="collapse navbar-collapse justify-content-center position-relative">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search videos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <span
              className="position-absolute end-0 me-4 top-50 translate-middle-y text-muted"
              style={{ cursor: 'pointer' }}
              onClick={() => setSearch('')}
            >
              ❌
            </span>
          )}
          {suggestions.length > 0 && (
            <ul className="list-group position-absolute z-index-3 w-50" style={{ top: '100%', left: '25%' }}>
              {suggestions.map((suggestion, idx) => (
                <li
                  key={idx}
                  className="list-group-item list-group-item-action"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSearch(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="d-flex align-items-center gap-2 ms-auto">
          <Link className={`btn ${isDark ? 'btn-outline-light' : 'btn-outline-primary'}`} to="/upload">
            ⬆️ Upload
          </Link>

          <Link to="/watch-later" className="btn btn-primary position-relative">
            Watch Later
            {watchLaterCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {watchLaterCount}
              </span>
            )}
          </Link>

          {token ? (
            <button className="btn btn-danger" onClick={handleLogout}>
              🚪 Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-primary">
                🔑 Sign In
              </Link>
              <Link to="/register" className="btn btn-primary">
                📝 Sign Up
              </Link>
            </>
          )}

          <button onClick={toggleDarkMode} className="btn btn-outline-secondary">
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </nav>

      <div className="text-center mt-2">
        <Timer />
      </div>
    </>
  );
};

export default Navbar;
