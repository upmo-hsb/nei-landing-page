import { useState, useEffect } from 'react';
import styles from './CountdownTimer.module.css';

const TARGET_DATE = new Date('2026-04-30T23:59:59');

function getTimeLeft() {
  const diff = TARGET_DATE - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Registration Closes In</h2>
      <div className={styles.timer}>
        {Object.entries(timeLeft).map(([label, value]) => (
          <div key={label} className={styles.box}>
            <span className={styles.number}>{String(value).padStart(2, '0')}</span>
            <span className={styles.label}>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CountdownTimer;
