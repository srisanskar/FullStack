import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [message, setMessage] = useState('');

  const showToast = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2000); // Hide after 2 seconds
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && (
        <div
          className="toast show position-fixed bottom-0 end-0 m-4"
          role="alert"
          style={{ zIndex: 1055 }}
        >
          <div className="toast-body bg-success text-white fw-semibold">
            {message}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
