import styles from './Contact.module.css';

function Contact() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Contact Us</h1>
        <div className={styles.grid}>
          <div className={styles.info}>
            <div className={styles.item}>
              <h3>Email</h3>
              <p>contact@nei2026.vn</p>
            </div>
            <div className={styles.item}>
              <h3>Phone</h3>
              <p>+84 (0) 24 XXXX XXXX</p>
            </div>
            <div className={styles.item}>
              <h3>Address</h3>
              <p>Hanoi School of Business &amp; Management<br />Hanoi, Vietnam</p>
            </div>
            <div className={styles.socials}>
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>
          <div className={styles.map}>
            <iframe
              title="NEI Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096!2d105.8342!3d21.0278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDAxJzQwLjEiTiAxMDXCsDUwJzAzLjEiRQ!5e0!3m2!1sen!2s!4v1"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Contact;
