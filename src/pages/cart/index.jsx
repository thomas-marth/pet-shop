import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import SectionHeading from "../../ui/sectionHeading";

function CartPage() {
  return (
    <div className={styles.container}>
      <SectionHeading
        title="Shopping cart"
        to="/"
        buttonText="Back to the store"
      />
      <p className={styles.cartMessage}>
        Looks like you have no items in your basket currently.
      </p>
      <Button
        className={`${styles.continueShoppingBtn} ${styles.mui}`}
        component={NavLink}
        to="/"
        variant="contained"
      >
        Continue Shopping
      </Button>
    </div>
  );
}

export default CartPage;
