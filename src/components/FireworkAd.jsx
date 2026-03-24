import { useState, useEffect, useRef, useCallback } from 'react';

const LINK = 'https://hsb.edu.vn/thong-tin-tuyen-sinh-dai-hoc-nam-2026-cua-hsb-du-kien.html';
const COLORS = ['#00c8ff', '#00c8ff', '#b5c900', '#ffffff', '#b5c900', '#00c8ff', '#ffffff'];
const N = 48;
const INTERVAL = 10000;
const SIGN_MS   = 10000;

export default function FireworkAd() {
  const [fw, setFw]           = useState(null);
  const [signVisible, setSV]  = useState(false);
  const timers    = useRef([]);
  const intervalR = useRef(null);
  const lastLaunch = useRef(0);

  // Cancel all pending timers from previous launch
  const clearAll = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const launch = useCallback(() => {
    clearAll();
    lastLaunch.current = Date.now();

    const side = Math.random() < 0.5 ? 'left' : 'right';
    const particles = Array.from({ length: N }, (_, i) => {
      const angle = (i / N) * 360 + (Math.random() - 0.5) * 10;
      const dist  = 55 + Math.random() * 120;
      const rad   = (angle * Math.PI) / 180;
      return {
        id:    i,
        dx:    Math.round(Math.cos(rad) * dist),
        dy:    Math.round(Math.sin(rad) * dist),
        color: COLORS[i % COLORS.length],
        size:  3 + Math.random() * 5,
        dur:   +(0.9 + Math.random() * 0.5).toFixed(2),
      };
    });

    setSV(false);
    setFw({ side, phase: 'rocket', particles });

    timers.current = [
      setTimeout(() => setFw(f => f && { ...f, phase: 'burst' }),   1300),
      setTimeout(() => { setFw(f => f && { ...f, phase: 'sign' }); setSV(true); }, 1600),
      setTimeout(() => setSV(false),                                  1600 + SIGN_MS),
      setTimeout(() => setFw(null),                                   1600 + SIGN_MS + 600),
    ];
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    intervalR.current = setInterval(launch, INTERVAL);

    // Resume immediately if returning to tab after long absence
    const onVisible = () => {
      if (!document.hidden && Date.now() - lastLaunch.current >= INTERVAL) {
        clearInterval(intervalR.current);
        launch();
        intervalR.current = setInterval(launch, INTERVAL);
      }
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      clearAll();
      clearInterval(intervalR.current);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [launch]);

  if (!fw) return null;
  const { side, phase, particles } = fw;

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998 }}>

      {/* Rocket */}
      {phase === 'rocket' && <div className={`fw-rocket fw-${side}`} />}

      {/* Explosion particles */}
      {(phase === 'burst' || phase === 'sign') && (
        <div className={`fw-burst fw-burst-${side}`}>
          {particles.map(p => (
            <div
              key={p.id}
              className="fw-particle"
              style={{
                width:      p.size,
                height:     p.size,
                background: p.color,
                boxShadow:  `0 0 ${Math.round(p.size * 2)}px ${p.color}`,
                '--dx':     `${p.dx}px`,
                '--dy':     `${p.dy}px`,
                animationDuration: `${p.dur}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Billboard — visibility via React state + CSS transition (scroll-safe) */}
      {phase === 'sign' && (
        <a
          href={LINK}
          target="_blank"
          rel="noopener noreferrer"
          className={`fw-sign fw-sign-${side}`}
          style={{
            pointerEvents: 'all',
            opacity:   signVisible ? 1 : 0,
            transform: signVisible ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(12px)',
          }}
          onClick={() => {
            clearAll();
            setSV(false);
            timers.current = [setTimeout(() => setFw(null), 450)];
          }}
        >
          <div className="fw-sign-inner">
            <div className="fw-sign-label">HSB · Tuyển sinh 2026</div>
            <span className="fw-sign-text">HSB Tuyển sinh QH.2026.D</span>
            <div className="fw-sign-cta">Xem chi tiết →</div>
          </div>
        </a>
      )}
    </div>
  );
}
