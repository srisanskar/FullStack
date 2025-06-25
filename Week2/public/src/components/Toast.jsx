import React from 'react';

const Toast = ({ message, visible }) => {
  return (
    <div
      className={`toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-4 ${visible ? 'show' : 'hide'}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{ zIndex: 9999 }}
    >
      <div className="d-flex">
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
};

export default Toast;
