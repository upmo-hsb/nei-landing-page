import { useState, useEffect } from 'react';

const LINK = 'https://hsb.edu.vn/thong-tin-tuyen-sinh-dai-hoc-nam-2026-cua-hsb-du-kien.html';
const COLORS = ['#00c8ff', '#00c8ff', '#b5c900', '#ffffff', '#b5c900', '#00c8ff', '#ffffff'];
const N = 48;

export default function FireworkAd() {
  const [fw, setFw] = useState(null);

  useEffect(() => {
    const launch = () => {
      const side = Math.random() < 0.5 ? 'left' : 'right';
      const particles = Array.from({ length: N }, (_, i) => {
        const angle = (i / N) * 360 + (Math.random() - 0.5) * 10;
        const dist = 55 + Math.random() * 120;
        const rad = (angle * Math.PI) / 180;
        return {
          id: i,
          dx: Math.round(Math.cos(rad) * dist),
          dy: Math.round(Math.sin(rad) * dist),
          color: COLORS[i % COLORS.length],
          size: 3 + Math.random() * 5,
          dur: +(0.9 + Math.random() * 0.5).toFixed(2),
        };
      });

      setFw({ side, phase: 'rocket', particles });
      setTimeout(() => setFw(f => f && { ...f, phase: 'burst' }), 1300);
      setTimeout(() => setFw(f => f && { ...f, phase: 'sign'  }), 1600);
      setTimeout(() => setFw(null), 7200); // 1600 + 5600
    };

    const id = setInterval(launch, 30000);
    return () => clearInterval(id);
  }, []);

  if (!fw) return null;
  const { side, phase, particles } = fw;

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998 }}>
      {phase === 'rocket' && <div className={`fw-rocket fw-${side}`} />}

      {(phase === 'burst' || phase === 'sign') && (
        <div className={`fw-burst fw-burst-${side}`}>
          {particles.map(p => (
            <div
              key={p.id}
              className="fw-particle"
              style={{
                width: p.size,
                height: p.size,
                background: p.color,
                boxShadow: `0 0 ${Math.round(p.size * 2)}px ${p.color}`,
                '--dx': `${p.dx}px`,
                '--dy': `${p.dy}px`,
                animationDuration: `${p.dur}s`,
              }}
            />
          ))}
        </div>
      )}

      {phase === 'sign' && (
        <a
          href={LINK}
          target="_blank"
          rel="noopener noreferrer"
          className={`fw-sign fw-sign-${side}`}
          style={{ pointerEvents: 'all' }}
          onClick={() => setFw(null)}
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
