import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-5 shadow-sm">
      <div className="text-center p-3 text-muted">
        © 2025 <strong>Sanskar Srivastava</strong> — MiniTube
        <span className="mx-2">|</span>
        <a
          href="https://github.com/jsrv07"
          target="_blank"
          rel="noreferrer"
          className="text-decoration-none text-muted"
        >
          GitHub
        </a>
        <span className="mx-2">|</span>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          className="text-decoration-none text-muted"
        >
          Twitter
        </a>
      </div>
    </footer>
  );
};

export default Footer;
