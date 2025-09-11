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
            className={styles.button}
          >
            Check out
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
