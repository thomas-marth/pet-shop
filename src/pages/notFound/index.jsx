import styles from "./styles.module.css";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import notFoundImg from "../../assets/images/4.png";
import notFoundPets from "../../assets/images/404-pets.png";

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.imgWrapper}>
        <img src={notFoundImg} alt="4" />
        <img src={notFoundPets} alt="4" />
        <img src={notFoundImg} alt="4" />
      </div>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.text}>
          We’re sorry, the page you requested could not be found. Please go back
          to the homepage.
        </p>
        <Button
          className={`${styles.goHomeBtn} ${styles.mui}`}
          component={NavLink}
          to="/"
          variant="contained"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPage;
