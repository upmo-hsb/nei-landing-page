import { useLang } from '../LangContext';

export default function Contact() {
  const { tx } = useLang();
  const c = tx.contact;

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>{c.title}</h1>
        <div className="contact-grid">
          <div>
            <div className="contact-cards">
              <div className="contact-card">
                <div className="contact-card-label">{c.emailLabel}</div>
                <div className="contact-card-value">
                  <a href="mailto:NEI2026@hsb.edu.vn">NEI2026@hsb.edu.vn</a>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card-label">{c.phoneLabel}</div>
                <div className="contact-card-value">
                  <a href="tel:0868226656">0868 22 66 56</a>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card-label">{c.addressLabel}</div>
                <div className="contact-card-value">
                  {c.address.split('\n').map((line, i) => <span key={i}>{i>0&&<br/>}{line}</span>)}
                </div>
              </div>
            </div>
          </div>

          <a href="https://maps.app.goo.gl/cg4GCgZPBtWJg8GR8" target="_blank" rel="noopener"
            style={{ display:'block', textDecoration:'none' }}>
            <div className="contact-map" style={{ position:'relative', overflow:'hidden', borderRadius:'12px', border:'1px solid #e5e7eb', height:'420px', background:'#e8edf2' }}>
              <img
                src="https://maps.googleapis.com/maps/api/staticmap?center=Truong+Quan+tri+va+Kinh+doanh+DHQGHN+144+Xuan+Thuy+Cau+Giay+Ha+Noi&zoom=16&size=800x420&maptype=roadmap&markers=color:red%7C21.038,105.782&language=vi"
                onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                style={{ width:'100%', height:'100%', objectFit:'cover' }}
                alt="Map"
              />
              <div style={{ display:'none', position:'absolute', inset:0, background:'linear-gradient(135deg,#e8edf2,#d0dcea)', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'1rem' }}>
                <div style={{ fontSize:'3rem' }}>📍</div>
                <div style={{ textAlign:'center', padding:'0 2rem' }}>
                  <div style={{ fontWeight:700, color:'#1a1a2e', marginBottom:'.4rem' }}>School of Business & Management</div>
                  <div style={{ color:'#555', fontSize:'.88rem' }}>Building B1, 144 Xuan Thuy, Cau Giay, Hanoi</div>
                </div>
                <div style={{ background:'#0057ff', color:'#fff', padding:'.6rem 1.4rem', borderRadius:'6px', fontSize:'.85rem', fontWeight:600 }}>
                  🗺 Open Google Maps →
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
