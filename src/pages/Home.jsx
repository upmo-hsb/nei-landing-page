import { useLang } from '../LangContext';

export default function Home({ navigate }) {
  const { tx } = useLang();
  const h = tx.hero;
  const s = tx.schedule;
  const p = tx.prizes;
  const sp = tx.speakers;
  const v = tx.venue;

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="badge"><span className="badge-dot"></span>{h.badge}</div>
          <h1 className="hero-title">
            <span className="hero-title-top">{h.titleTop}</span>
            <span className="hero-title-bottom">{h.titleBottom}</span>
          </h1>
          <p className="hero-sub">{h.sub.split('\n').map((line, i) => (
            <span key={i}>{line}{i === 0 && <br/>}</span>
          ))}</p>
          <div className="hero-btns">
            <a className="btn-primary" href="#" onClick={e => { e.preventDefault(); navigate('register'); }}>{h.btnPrimary}</a>
            <a href="#schedule" className="btn-secondary">{h.btnSecondary}</a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats">
        {tx.stats.map((s, i) => (
          <div className="stat" key={i}>
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* SCHEDULE */}
      <section id="schedule">
        <div className="section-inner">
          <div className="section-tag">{s.tag}</div>
          <h2 className="section-title">{s.titleA}<br/><em>{s.titleB}</em></h2>
          <p className="section-desc">{s.desc}</p>
          <div className="schedule-phases">
            {s.phases.map((ph, i) => (
              <div className="phase-block" key={i}>
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

      {/* PRIZES */}
      <section id="prizes" style={{ background:'rgba(0,200,255,.015)' }}>
        <div className="section-inner">
          <div className="section-tag">{p.tag}</div>
          <h2 className="section-title">{p.titleA}<br/><em>{p.titleB}</em></h2>
          <div className="prizes-grid">
            {p.cards.map((card, i) => (
              <div className="prize-card" key={i} style={{ borderColor: card.borderColor || 'rgba(255,255,255,.06)' }}>
                <div className="prize-icon">{card.icon}</div>
                <div className="prize-rank">{card.rank}</div>
                <div className="prize-amount">{card.amount}</div>
                <div className="prize-extra">
                  {card.extra.split('\n').map((line, j) => (
                    <span key={j} style={j===1 ? { color:'var(--blue)' } : {}}>
                      {j===0 ? line : <><br/><span style={{color:'var(--blue)'}}>{line}</span></>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="prize-note">
            <p>{p.note1}</p>
            <p style={{ marginTop:'.6rem', color:'rgba(255,255,255,.45)', fontSize:'.8rem' }}>{p.note2}</p>
          </div>
        </div>
      </section>

      {/* SPEAKERS */}
      <section id="speakers">
        <div className="section-inner">
          <div className="section-tag">{sp.tag}</div>
          <h2 className="section-title">{sp.titleA}<br/><em>{sp.titleB}</em></h2>
          <p className="section-desc">{sp.desc}</p>
          <div className="speakers-grid">
            {sp.cards.map((card, i) => (
              <div className="speaker-card" key={i}>
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
          <div className="section-tag">{v.tag}</div>
          <h2 className="section-title">{v.titleA}<br/><em>{v.titleB}</em></h2>
          <div className="venue-box" style={{ marginTop:'3rem' }}>
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
    </>
  );
}
