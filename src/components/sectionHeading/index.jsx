import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";

const SectionHeading = ({ title, to, buttonText }) => {
  return (
    <div className={styles.top}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.buttonWrapper}>
        <div className={styles.divider} />
        <Button
          className={`${styles.button} ${styles.mui}`}
          component={NavLink}
          to={to}
          variant="outlined"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default SectionHeading;
