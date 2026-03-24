import { useEffect } from 'react';
import { useLang } from '../LangContext';

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Home({ navigate }) {
  const { tx, lang } = useLang();
  const h = tx.hero;
  const s = tx.schedule;
  const p = tx.prizes;
  const sp = tx.speakers;
  const v = tx.venue;

  useScrollReveal();

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-particles" aria-hidden="true">
          <span/><span/><span/><span/><span/><span/>
        </div>
        <div className="hero-content">
          <h1 className="hero-title hero-anim-1">
            <span className="hero-title-top">{h.titleTop}</span>
            <span className="hero-title-bottom">{h.titleBottom}</span>
          </h1>
          <p className="hero-sub hero-anim-2">{h.sub.split('\n').map((line, i) => (
            <span key={i}>{line}{i === 0 && <br/>}</span>
          ))}</p>
          <div className="hero-btns hero-anim-3">
            <a className="btn-primary" href="#" onClick={e => { e.preventDefault(); navigate('register'); }}>{h.btnPrimary}</a>
            <a href="#prizes" className="btn-secondary">{h.btnSecondary}</a>
          </div>
        </div>
        <a href="#stats" className="hero-scroll-hint" aria-label="scroll">
          <span className="hero-scroll-line"/>
          <span className="hero-scroll-arrow"/>
        </a>
      </section>

      {/* STATS */}
      <div id="stats" className="stats">
        {tx.stats.map((st, i) => (
          <div className="stat reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="stat-num">{st.num}</div>
            <div className="stat-label">{st.label}</div>
          </div>
        ))}
      </div>

      {/* PRIZES — moved up for impact */}
      <section id="prizes" className="section-alt">
        <div className="section-inner">
          <div className="section-tag reveal">{p.tag}</div>
          <h2 className="section-title reveal">{p.titleA}<br/><em>{p.titleB}</em></h2>
          <div className="prizes-grid" style={{ marginTop: '2.5rem' }}>
            {p.cards.map((card, i) => (
              <div
                className={`prize-card reveal${i === 0 ? ' prize-featured' : ''}`}
                key={i}
                style={{ borderColor: card.borderColor || 'rgba(255,255,255,.06)', transitionDelay: `${i * 0.1}s` }}
              >
                <div className="prize-icon">{card.icon}</div>
                <div className="prize-rank">{card.rank}</div>
                <div className="prize-amount">{card.amount}</div>
                <div className="prize-extra">
                  {card.extra.split('\n').map((line, j) => (
                    <span key={j}>
                      {j === 0 ? line : <><br/><span style={{color:'var(--blue)'}}>{line}</span></>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="prize-note reveal" style={{ transitionDelay: '0.4s' }}>
            <p>{p.note1}</p>
            <p style={{ marginTop:'.6rem', color:'rgba(255,255,255,.45)', fontSize:'.8rem' }}>{p.note2}</p>
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule">
        <div className="section-inner">
          <div className="section-tag reveal">{s.tag}</div>
          <h2 className="section-title reveal">{s.titleA}<br/><em>{s.titleB}</em></h2>
          <p className="section-desc reveal">{s.desc}</p>
          <div className="schedule-phases">
            {s.phases.map((ph, i) => (
              <div className="phase-block reveal" key={i} style={{ transitionDelay: `${i * 0.15}s` }}>
                <div className="phase-header">
                  <span className={`phase-badge ${ph.badgeClass}`}>{ph.badge}</span>
                  <div className="phase-title">{ph.title}</div>
                  <div className="phase-date">{ph.date}</div>
                </div>
                <div className="phase-body">
                  {ph.rows.map((row, j) => (
                    <div className="phase-row" key={j}>{row}</div>
                  ))}
                  <div className="phase-row" style={{ color: ph.badgeClass === 'phase-3' ? '#ffc46b' : 'var(--lime)', fontWeight:600 }}>
                    {ph.highlight}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPEAKERS */}
      <section id="speakers" className="section-alt">
        <div className="section-inner">
          <div className="section-tag reveal">{sp.tag}</div>
          <h2 className="section-title reveal">{sp.titleA}<br/><em>{sp.titleB}</em></h2>
          <p className="section-desc reveal">{sp.desc}</p>
          <div className="speakers-grid">
            {sp.cards.map((card, i) => (
              <div className="speaker-card reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="speaker-avatar">{card.icon}</div>
                <div className="speaker-name">{card.name}</div>
                <div className="speaker-role">{card.role.split('\n').map((line, j) => (
                  <span key={j}>{j > 0 && <br/>}{line}</span>
                ))}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VENUE */}
      <section id="venue">
        <div className="section-inner">
          <div className="section-tag reveal">{v.tag}</div>
          <h2 className="section-title reveal">{v.titleA}<br/><em>{v.titleB}</em></h2>
          <div className="venue-box reveal" style={{ marginTop:'3rem' }}>
            <div className="venue-map">
              <span>🏛️</span>
              <p>{v.mapLabel.split('\n').map((line,i)=><span key={i}>{i>0&&<br/>}{line}</span>)}</p>
            </div>
            <div>
              <p className="section-desc">{v.desc}</p>
              <div className="venue-detail">
                {v.details.map((d, i) => (
                  <div className="venue-row" key={i}>
                    <div className="venue-icon">{d.icon}</div>
                    <div className="venue-info">
                      <strong>{d.strong}</strong>
                      {d.link
                        ? <span><a href={d.link} style={{ color:'var(--blue)' }}>{d.span}</a></span>
                        : <span>{d.span}</span>
                      }
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:'2.2rem' }}>
                <a href="#" className="btn-primary" onClick={e => { e.preventDefault(); navigate('register'); }}>
                  {v.btn}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-glow" aria-hidden="true"/>
        <div className="section-inner">
          <div className="reveal">
            <h2 className="cta-title">
              {lang === 'vi' ? <>Sẵn sàng<br/><em>tham chiến?</em></> : <>Ready to<br/><em>compete?</em></>}
            </h2>
            <p className="cta-sub">
              {lang === 'vi'
                ? 'Hạn đăng ký đang đến gần. Đừng để cơ hội này trôi qua.'
                : "Registration deadline is approaching. Don't miss your chance."}
            </p>
            <a className="btn-primary btn-cta" href="#" onClick={e => { e.preventDefault(); navigate('register'); }}>
              {h.btnPrimary}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
