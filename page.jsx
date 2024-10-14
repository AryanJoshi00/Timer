"use client";

import React, { useState, useRef } from 'react';

const CountdownTimer = () => {
  const [time, setTime] = useState(8 * 60 * 60); 
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  // Start the countdown
  const startTimer = () => {
    if (!isRunning && time > 0) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000); // Decrease every second
    }
  };

  // Pause the countdown
  const pauseTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  // Reset the countdown to 8 hours
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(8 * 60 * 60); // Reset to 8 hours
  };

  // Format seconds to HH:MM:SS
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.timeDisplay}>{formatTime(time)}</h1>
      <div style={styles.buttonContainer}>
        <button onClick={startTimer} style={styles.button}>Start</button>
        <button onClick={pauseTimer} style={styles.button}>Pause</button>
        <button onClick={resetTimer} style={styles.button}>Reset</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  timeDisplay: {
    fontSize: '10rem',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '30px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    border: '2px solid #FFFFFF ',
    borderRadius: '5px',
  }
};

export default CountdownTimer;
