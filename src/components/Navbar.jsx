import { useLang } from '../LangContext';

export default function Navbar({ page, navigate }) {
  const { tx, toggleLang } = useLang();

  return (
    <nav>
      <a className="logo" href="#" onClick={e => { e.preventDefault(); navigate('home'); }}>
        <span className="logo-nei">NEI</span>
        <span className="logo-year">2026</span>
      </a>
      <ul className="nav-links">
        <li>
          <a href="#" onClick={e => { e.preventDefault(); navigate('home'); }}
            className={page === 'home' ? 'active-nav' : ''}>
            {tx.nav.home}
          </a>
        </li>
        <li>
          <a href="#" onClick={e => { e.preventDefault(); navigate('register'); }}
            className={page === 'register' ? 'active-nav' : ''}>
            {tx.nav.register}
          </a>
        </li>
        <li>
          <a href="#" onClick={e => { e.preventDefault(); navigate('contact'); }}
            className={page === 'contact' ? 'active-nav' : ''}>
            {tx.nav.contact}
          </a>
        </li>
        <li>
          <button className="lang-btn" onClick={toggleLang}>{tx.nav.lang}</button>
        </li>
      </ul>
      <a href="#" className="nav-register-btn"
        onClick={e => { e.preventDefault(); navigate('register'); }}>
        {tx.nav.cta}
      </a>
    </nav>
  );
}
