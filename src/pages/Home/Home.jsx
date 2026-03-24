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
        <div className={styles.sponsorsGrid}>
          <div className={styles.sponsorItem}>
            <p className={styles.sponsorCategory}>Đơn Vị Tổ Chức</p>
            <div className={styles.sponsorLogo}>
              <img src="/logo-acquin.png" alt="Đơn vị tổ chức" />
            </div>
          </div>
          <div className={styles.sponsorItem}>
            <p className={styles.sponsorCategory}>Đơn Vị Đồng Hành</p>
            <div className={styles.sponsorLogo}>
              <img src="/logo-hsbm.png" alt="Đơn vị đồng hành" />
            </div>
          </div>
          <div className={styles.sponsorItem}>
            <p className={styles.sponsorCategory}>Đơn Vị Bảo Trợ Chuyên Môn</p>
            <div className={styles.sponsorLogo}>
              <img src="/Logo UET.jpg" alt="Đơn vị bảo trợ chuyên môn" />
            </div>
          </div>
          <div className={styles.sponsorItem}>
            <p className={styles.sponsorCategory}>Đơn Vị Bảo Trợ Truyền Thông</p>
            <div className={styles.sponsorLogo}>
              <img src="/Logo_Đài_Phát_thanh_&_Truyền_hình_Hà_Nội_-_HTV.svg.png" alt="Đơn vị bảo trợ truyền thông" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
