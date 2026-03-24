import { useLang } from '../LangContext';

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScUpIql_oyu0NVW2p6HTlqzHktOhik2FU4PeAEL_-u6xD9Ccw/viewform?embedded=true';

export default function Register() {
  const { tx } = useLang();
  const r = tx.register;

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>{r.title}</h1>
        <p className="reg-sub">{r.sub}</p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '1.5rem',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,.08)',
        }}>
          <iframe
            src={FORM_URL}
            width="100%"
            height="1700"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            style={{ background: '#fff', borderRadius: '12px' }}
          >
            Đang tải…
          </iframe>
        </div>
      </div>
    </div>
  );
}
