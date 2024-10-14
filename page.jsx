"use client";
import React, { useState, useRef } from 'react';

const CountdownTimer: React.FC = () => {
  const [time, setTime] = useState<number>(1 * 1 * 60); // 8 hours in seconds
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (!isRunning && time > 0) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  const pauseTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current!);
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current!);
    setIsRunning(false);
    setTime(8 * 60 * 60); // Reset
  };

  const formatTime = (timeInSeconds: number): string => {
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

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  timeDisplay: {
    fontSize: '15rem',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '30px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '3rem',
    cursor: 'pointer',
    border: '2px solid #FFFFFF',
    borderRadius: '5px',
  }
};

export default CountdownTimer;

