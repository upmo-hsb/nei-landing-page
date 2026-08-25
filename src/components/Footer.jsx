import { useLang } from '../LangContext';

const SPONSOR_LOGOS = [
  [{ src: '/logo-qs.png', alt: 'Trường Quản trị và Kinh doanh HSB' }],
  [
    { src: '/logo-hsbm.png', alt: 'Sở Giáo dục và Đào tạo Hà Nội' },
    { src: '/logo-so-gddt-hung-yen.png', alt: 'Sở Giáo dục và Đào tạo Hưng Yên' },
  ],
  [{ src: '/logo-htv.png', alt: 'Đơn vị bảo trợ truyền thông' }],
];

export default function Footer() {
  const { tx } = useLang();
  const f = tx.footer;

  return (
    <footer style={{ background:'#fff', borderTop:'1px solid #e5e7eb', padding:0, color:'#111' }}>
      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'3rem 2rem' }}>

        {/* Top row: branding + contact */}
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:'2rem', marginBottom:'2.5rem' }}>
          <div>
            <div style={{ display:'flex', alignItems:'baseline', gap:'.3rem', marginBottom:'1.5rem' }}>
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:'1.8rem', letterSpacing:'2px', color:'#b5c900' }}>NIE</span>
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'1.8rem', color:'#111' }}>2026</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'.7rem' }}>
              <a href="tel:0868226656" style={{ color:'#111', textDecoration:'none', fontSize:'.92rem', display:'flex', alignItems:'center', gap:'.5rem' }}>
                📞 <span>{f.hotline}</span>
              </a>
              <a href="https://hsb.edu.vn" target="_blank" rel="noopener" style={{ color:'#111', textDecoration:'none', fontSize:'.92rem', display:'flex', alignItems:'center', gap:'.5rem' }}>
                🌐 <span>{f.website}</span>
              </a>
              <a href="https://www.facebook.com/TruongQuanTrivaKinhDoanhHSB" target="_blank" rel="noopener noreferrer" style={{ color:'#0067c9', textDecoration:'underline', textUnderlineOffset:'3px', fontWeight:600, fontSize:'.92rem', display:'flex', alignItems:'center', gap:'.5rem' }}>
                📘 <span>{f.schoolFanpage}</span>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61592814106251" target="_blank" rel="noopener noreferrer" style={{ color:'#0067c9', textDecoration:'underline', textUnderlineOffset:'3px', fontWeight:600, fontSize:'.92rem', display:'flex', alignItems:'center', gap:'.5rem' }}>
                📘 <span>{f.contestFanpage}</span>
              </a>
            </div>
            <p style={{ marginTop:'1.8rem', fontSize:'.75rem', color:'#888', lineHeight:1.6 }}>
              {f.copy.split('\n').map((line,i) => <span key={i}>{i>0&&<br/>}{line}</span>)}
            </p>
          </div>
        </div>

        {/* Bottom row: 3 sponsor boxes equally spaced */}
        <div className="footer-sponsor-grid">
          {f.boxes.map((label, i) => (
            <div key={i} style={{ background:'#f8f9fa', border:'1px solid #e5e7eb', borderRadius:'10px', padding:'1.5rem', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'160px' }}>
              <div style={{ fontSize:'.65rem', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:'#888', marginBottom:'1rem' }}>{label}</div>
              <div className={`footer-sponsor-logos${i === 1 ? ' footer-sponsor-logos-pair' : ''}`}>
                {SPONSOR_LOGOS[i].map(logo => (
                  <img
                    key={logo.src}
                    src={logo.src}
                    alt={logo.alt}
                    style={{ height: i === 0 ? '110px' : '80px', width:'auto', maxWidth:'100%', objectFit:'contain' }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </footer>
  );
}
