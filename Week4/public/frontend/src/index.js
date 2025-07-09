import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // 🛑 Removed <React.StrictMode>
  <Router>
    <ToastProvider>
      <App />
    </ToastProvider>
  </Router>
);
