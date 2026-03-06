import { Link } from 'react-router-dom';
import CountdownTimer from '../../components/CountdownTimer/CountdownTimer';
import styles from './Home.module.css';

function Home() {
  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.tag}>April - May 2026 | Hanoi, Vietnam</p>
          <h1 className={styles.headline}>
            Northern Entrepreneurship
            <br />
            <span className={styles.headlineAccent}>Innovation Contest</span>
          </h1>
          <p className={styles.sub}>
            The premier startup competition for high school students in Northern Vietnam.
            Pitch your ideas. Build your future.
          </p>
          <Link to="/register" className={styles.ctaButton}>Register Now</Link>
        </div>
      </section>

      <CountdownTimer />

      <section className={styles.stats}>
        <div className={styles.statsGrid}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>500+</span>
            <span className={styles.statLabel}>Students</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>Schools</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>20+</span>
            <span className={styles.statLabel}>Mentors</span>
          </div>
        </div>
      </section>

      <section className={styles.highlights}>
        <h2 className={styles.sectionTitle}>Key Dates</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <span className={styles.cardDate}>1 April 2026</span>
            <h3>Registration Opens</h3>
            <p>Teams can begin submitting their applications</p>
          </div>
          <div className={styles.card}>
            <span className={styles.cardDate}>30 April 2026</span>
            <h3>Submission Deadline</h3>
            <p>All applications and project proposals must be submitted</p>
          </div>
          <div className={styles.card}>
            <span className={styles.cardDate}>30 May 2026</span>
            <h3>Finals Day</h3>
            <p>Top teams pitch live to judges and compete for prizes</p>
          </div>
        </div>
      </section>

      <section className={styles.sponsors}>
        <p className={styles.sponsorsLabel}>Sponsored By</p>
        <div className={styles.sponsorsLogos}>
          <div className={styles.sponsorLogo}>
            <img src="/logo-hsbm.png" alt="Hanoi School of Business & Management" />
          </div>
          <div className={styles.sponsorLogo}>
            <img src="/logo-acquin.png" alt="Hanoi Department of Education" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
