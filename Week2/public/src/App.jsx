import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import WatchLater from './pages/WatchLater';
import Navbar from './components/Navbar';

const App = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = sessionStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDark(true);
      document.body.classList.add('dark-theme');
    }
  }, []);

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <aside
          className={`sidebar p-3 border-end ${isDark ? 'bg-dark text-light' : 'bg-light text-dark'}`}
          style={{ width: '200px', minHeight: '100vh' }}
        >
          <ul className="nav flex-column gap-2">
            <li className="nav-item fw-bold">
              <Link to="/" className="nav-link text-reset">🏠 Home</Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link text-reset">🔥 Trending</Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link text-reset">🎵 Music</Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link text-reset">📺 Subscriptions</Link>
            </li>
          </ul>
        </aside>

        <main className="flex-grow-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watch-later" element={<WatchLater />} />
          </Routes>
        </main>
      </div>

      <footer className={`text-center py-3 ${isDark ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
        <div className="container">
          © 2025 MiniTube by <strong>Sanskar Srivastava</strong> |
          <a
            href="https://github.com/srisanskar"
            target="_blank"
            rel="noreferrer"
            className={`ms-2 text-decoration-none ${isDark ? 'text-info' : 'text-primary'}`}
          >
            GitHub
          </a>
        </div>
      </footer>
    </>
  );
};

export default App;
