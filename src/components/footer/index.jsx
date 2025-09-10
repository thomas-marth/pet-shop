import styles from "./styles.module.css";
import Instagram from "../../assets/icons/ic-instagram.svg";
import Whatsapp from "../../assets/icons/ic-whatsapp.svg";
import MapImage from "../../assets/images/map.png";

const Footer = () => {
  return (
    <div className={styles.container}>
      <footer>
        <h2>Contact</h2>
        <footer className={styles.flexWrapper}>
          {/* Contact blocks */}
          <div className={styles.infoGrid}>
            <div className={styles.infoBlock}>
              <h4 className={styles.title}>Phone</h4>
              <p className={styles.text}>+49 30 915-88492</p>
            </div>
            <div className={`${styles.infoBlock} ${styles.socialsBlock}`}>
              <h4 className={styles.title}>Socials</h4>
              <div className={styles.socials}>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <img src={Instagram} alt="Instagram icon" />
                </a>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Whatsapp"
                >
                  <img src={Whatsapp} alt="Whatsapp icon" />
                </a>
              </div>
            </div>
            <div className={styles.infoBlock}>
              <h4 className={styles.title}>Address</h4>
              <p className={styles.text}>
                Wallstraße 9-13, 10179 Berlin, Deutschland
              </p>
            </div>
            <div className={styles.infoBlock}>
              <h4 className={styles.title}>Working Hours</h4>
              <p className={styles.text}>24 hours a day</p>
            </div>
          </div>
          <div className={styles.mapWrapper}>
            <img
              src={MapImage}
              alt="Store location map"
              className={styles.map}
            />
          </div>
        </footer>
        {/* Map section */}
      </footer>
    </div>
  );
};

export default Footer;
