import React, { useState, useEffect } from 'react';
import './new.css'

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (time) => {
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return time.toLocaleTimeString(undefined, options);
  };

  return (
    
    <div className='date'>
      <h2>{formatDate(currentTime)}</h2>
      <h1>{formatTime(currentTime)}</h1>
      
    </div>
  );
}

export default Clock;
