import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.sponsors}>
          <p className={styles.label}>Sponsored by</p>
          <div className={styles.logos}>
            <div className={styles.logoPlaceholder}>Hanoi School of Business &amp; Management</div>
            <div className={styles.logoPlaceholder}>Hanoi Department of Education</div>
          </div>
        </div>
        <div className={styles.socials}>
          <a href="#" aria-label="Facebook">FB</a>
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="Email">Email</a>
        </div>
        <p className={styles.copy}>2026 Northern Entrepreneurship Innovation Contest. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
