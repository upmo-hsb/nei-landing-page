import { useLang } from '../LangContext';

const HSB_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAA..."; // placeholder

export default function Footer({ navigate }) {
  const { tx } = useLang();
  const f = tx.footer;

  return (
    <footer style={{ background:'#fff', borderTop:'1px solid #e5e7eb', padding:0, color:'#111' }}>
      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'3rem 2rem', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' }}>
        <div>
          <div style={{ display:'flex', alignItems:'baseline', gap:'.3rem', marginBottom:'1.5rem' }}>
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:'1.8rem', letterSpacing:'2px', color:'#b5c900' }}>NEI</span>
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'1.8rem', color:'#111' }}>2026</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'.7rem' }}>
            <a href="tel:0868226656" style={{ color:'#111', textDecoration:'none', fontSize:'.92rem', display:'flex', alignItems:'center', gap:'.5rem' }}>
              📞 <span>{f.hotline}</span>
            </a>
            <a href="https://hsb.edu.vn" target="_blank" rel="noopener" style={{ color:'#111', textDecoration:'none', fontSize:'.92rem', display:'flex', alignItems:'center', gap:'.5rem' }}>
              🌐 <span>{f.website}</span>
            </a>
            <a href="https://www.facebook.com/TruongQuanTrivaKinhDoanhHSB" target="_blank" rel="noopener" style={{ color:'#111', textDecoration:'none', fontSize:'.92rem', display:'flex', alignItems:'center', gap:'.5rem' }}>
              📘 <span>{f.facebook}</span>
            </a>
          </div>
          <p style={{ marginTop:'1.8rem', fontSize:'.75rem', color:'#888', lineHeight:1.6 }}>
            {f.copy.split('\n').map((line,i) => <span key={i}>{i>0&&<br/>}{line}</span>)}
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
          {f.boxes.map((label, i) => (
            <div key={i} style={{ background:'#f8f9fa', border:'1px solid #e5e7eb', borderRadius:'10px', padding:'1.2rem', textAlign:'center' }}>
              <div style={{ fontSize:'.65rem', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:'#888', marginBottom:'.8rem' }}>{label}</div>
              <img
                src={[
                  '/logo-acquin.png',
                  '/logo-hsbm.png',
                  '/Logo UET.jpg',
                  '/logo-htv.png'
                ][i]}
                alt={label}
                style={{ height:'72px', width:'auto', maxWidth:'100%', objectFit:'contain' }}
              />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
