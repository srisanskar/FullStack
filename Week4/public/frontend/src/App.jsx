// src/App.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Watch from './pages/Watch';
import WatchLater from './pages/WatchLater';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Upload from './pages/Upload';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar'; // ✅ Add this
import Category from './pages/Category';



const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [search, setSearch] = useState(''); // ✅ lifted state

  useEffect(() => {
    const storedTheme = sessionStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDark(true);
      document.body.classList.add('dark-theme');
    }
  }, []);

  return (
    <>
      <Navbar search={search} setSearch={setSearch} /> {/* ✅ passed here */}

      <div className="d-flex">
        <Sidebar isDark={isDark} />



        <main className="flex-grow-1 p-4">
          <Routes>
            <Route path="/" element={<Home search={search} />} /> {/* ✅ pass to Home */}
            <Route path="/watch/:id" element={<Watch />} />
            <Route path="/watch-later" element={<WatchLater />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/category/music" element={<Category category="music" />} />
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
