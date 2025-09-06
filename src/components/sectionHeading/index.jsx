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
          component={NavLink}
          to={to}
          variant="outlined"
          sx={{
            color: "#8B8B8B",
            borderColor: "#DDD",
            fontFamily: "Montserrat",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: 1.3,
            textTransform: "none",
            borderRadius: "6px",
            marginTop: "9px",
            transition: "all 0.3s",
            "&:hover": {
              backgroundColor: "#282828",
              color: "#fff",
            },
          }}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default SectionHeading;
