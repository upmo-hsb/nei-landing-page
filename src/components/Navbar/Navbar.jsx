import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoAccent}>NEI</span> 2026
        </Link>
        <ul className={styles.links}>
          <li>
            <Link to="/" className={location.pathname === '/' ? styles.active : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/register" className={location.pathname === '/register' ? styles.active : ''}>
              Register
            </Link>
          </li>
          <li>
            <Link to="/contact" className={location.pathname === '/contact' ? styles.active : ''}>
              Contact
            </Link>
          </li>
        </ul>
        <Link to="/register" className={styles.cta}>Register Now</Link>
      </div>
    </nav>
  );
}

export default Navbar;
