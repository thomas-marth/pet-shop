import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Amazing Discounts on Pets Products!</h1>
          <Button
            component={NavLink}
            to="/sales"
            variant="contained"
            sx={{
              fontFamily: "Montserrat",
              fontSize: "20px",
              fontWeight: 600,
              textTransform: "none",
              lineHeight: 1.3,
              backgroundColor: "#0D50FF",
              padding: "16px 56px",
              "&:hover": {
                backgroundColor: "#000",
              },
            }}
          >
            Check out
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
