// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isDark }) => {
  const location = useLocation();
  const sidebarClass = isDark ? 'bg-dark text-light' : 'bg-white text-dark';

  const navItems = [
    { label: '🏠 Home', path: '/' },
    { label: '🎵 Music', path: '/category/music' },
    { label: '🧑‍💼 Dashboard', path: '/dashboard' },
  ];

  return (
    <div
      className={`sidebar d-flex flex-column flex-shrink-0 p-3 ${isDark ? 'bg-dark text-light' : 'bg-light text-dark'}`}
      style={{ minHeight: '100vh', width: '220px' }}
    >
      <h5 className="text-center mb-4 fw-bold">{isDark ? '📺 Menu' : <span className="text-primary">📺 Menu</span>}</h5>
      <ul className="nav nav-pills flex-column mb-auto">
        {navItems.map((item) => (
          <li className="nav-item" key={item.path}>
            <Link
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : isDark ? 'text-light' : 'text-dark'}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
