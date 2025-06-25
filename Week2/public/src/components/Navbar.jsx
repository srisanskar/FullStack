import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Timer from './Timer';

const Navbar = () => {
  const [watchLaterCount, setWatchLaterCount] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const updateCount = () => {
      const storedWatchLater = JSON.parse(sessionStorage.getItem('watchLater')) || [];
      setWatchLaterCount(storedWatchLater.length);
    };

    updateCount();
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

  return (
    <>
      <nav className={`navbar navbar-expand-lg px-4 ${isDark ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
        <Link className="navbar-brand fw-bold text-primary" to="/">
          MiniTube 🎬
        </Link>

        <div className="collapse navbar-collapse justify-content-center">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search (disabled)"
            disabled
          />
        </div>

        <div className="d-flex align-items-center gap-2">
          <Link to="/watch-later" className="btn btn-primary position-relative">
            Watch Later
            {watchLaterCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {watchLaterCount}
              </span>
            )}
          </Link>

          <button onClick={toggleDarkMode} className="btn btn-outline-secondary ms-2">
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
