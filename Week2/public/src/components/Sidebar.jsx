import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Shorts', path: '/shorts' },
    { label: 'Subscriptions', path: '/subs' },
    { label: 'Watch Later', path: '/watch-later' },
  ];

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ minHeight: '100vh', width: '220px' }}>
      <h5 className="text-center mb-4 fw-bold text-primary">📺 Menu</h5>
      <ul className="nav nav-pills flex-column mb-auto">
        {navItems.map((item) => (
          <li className="nav-item" key={item.path}>
            <Link
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : 'text-dark'}`}
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
