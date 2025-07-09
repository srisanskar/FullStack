import React, { useEffect, useState } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(() => {
    return parseInt(sessionStorage.getItem('timer') || '0', 10);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        sessionStorage.setItem('timer', prev + 1);
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-secondary small">
      Time spent on site: <strong>{seconds} seconds</strong>
    </div>
  );
};

export default Timer;
